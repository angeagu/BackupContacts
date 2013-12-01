

var fReader;


function importarBackupContactos() {

	//Creamos un contacto de prueba y lo guardamos   
	//alert('entrando en importarBackupContactos()');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, obtenerFicheroImportar, errorFichero);
}
 
function obtenerFicheroImportar(fileSystem) {
		//alert("Nombre: " + fileSystem.name);
		//alert("Root: " + fileSystem.root.fullPath);
        fileSystem.root.getFile("contacts.xml", {create: true, exclusive: false}, gotFileEntryImportar, errorFichero);
        
    }
    
function gotFileEntryImportar(fileEntry) {
	//alert('entrando en gotFileEntryImportar');
	fileEntry.file(gotFileImportar, errorFichero);
}

function gotFileImportar(file) {
	fReader = new FileReader();
	fReader.onloadend = function (event) {
	//alert('Fichero leido');
	var xml = event.target.result;
	procesarFicheroContactos(xml);
	
	}
	
	fReader.readAsText(file);
	
}

function procesarFicheroContactos(xml) {
	
	
	//alert('procesarFicheroContactos');
	
	//Creamos un contacto de prueba y lo guardamos
	/*
	var contact2 = navigator.contacts.create();
	contact2.displayName = "AaPrueba Display Name";
        
    var phoneNumbers = [];
	phoneNumbers[0] = new ContactField('work', '123456789', false);
	phoneNumbers[1] = new ContactField('mobile', '987654321', true); // preferred number
    contact2.phoneNumbers = phoneNumbers;
    
    alert(6);
    contact2.save(contactoGuardado,errorGuardarContacto);
    alert(7);
	*/

	$(xml).find("contacto").each(function() {
		
		//OJO!!! el metodo create crea el contacto pero no lo salva.
		var contact = navigator.contacts.create();
		
		var displayname = $(this).find("displayname").text();
		
		var nombre = $(this).find("nombre").text();
		contact.displayName = nombre;
		
		var telefono = $(this).find("telefono").text();
		//alert("telefono: " + telefono);
		
		if (telefono.length > 0) {
			var phoneNumbers = [];
			phoneNumbers[0] = new ContactField('mobile',telefono,true);
			contact.phoneNumbers = phoneNumbers;
		}
		
		
		var emails = $(this).find("email").text();
		
		if (emails.length > 0) {
			var dirEmails = [];
			var contactAddress = new ContactAddress();
			contactAddress.pref = false;
			contactAddress.formatted = emails;
			dirEmails[0] = contactAddress;
			
			contact.emails = dirEmails;
		}
		
		
		var	info = 'displayname: ' + displayname + '\n';
			info = info + 'nombre: ' + nombre + '\n';
			info = info + 'telefono: ' + telefono + '\n';
			info = info + 'email: ' + emails;
		//alert(info);
		
		//para almacenar el contacto, descomentar la operacion save.
		contact.save(contactoGuardado,errorGuardarContacto);
		
	});
	
	alert('Importacion de contactos finalizada correctamente');
	
}

function errorFichero(error) {
    //alert('Error al realizar operación de ficheros: ' + error.message);
    console.log(error.code);        
    }
    
function contactoGuardado(contact) {
	//alert ('contacto guardado correctamente');
	console.log('contacto guardado correctamente');
	}
	
function errorGuardarContacto(contactError) {
	//alert("Error al guardar contacto:  " + contactError.code);
	//alert("Error al guardar contacto:  " + contactError.message);
	console.log("Error al guardar contacto:  " + contactError.code);
	
}