
var fReader;

function importarBackupContactos() {

//Creamos un contacto de prueba y lo guardamos   
	alert('entrando en importarBackupContactos()');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, obtenerFicheroImportar, errorFichero);
}

function obtenerFicheroImportar(fileSystem) {
		alert("Nombre: " + fileSystem.name);
		alert("Root: " + fileSystem.root.fullPath);
        fileSystem.root.getFile("contacts.xml", {create: true, exclusive: false}, gotFileEntryImportar, errorFichero);
    }
    
function gotFileEntryImportar(fileEntry) {
	alert('entrando en gotFileEntryImportar');
	fileEntry.file(gotFileImportar, errorFichero);
}

function gotFileImportar(file) {
	fReader = new FileReader();
	fReader.onloadend = function (event) {
		alert('Fichero leido');
		var xml = event.target.result;
		procesarFicheroContactos(xml);
	}
	fReader.readAsText(file);
	
}

function procesarFicheroContactos(xml) {
	
	alert('procesarFicheroContactos');
	
	//Creamos un contacto de prueba y lo guardamos
	/*
	var contact2 = navigator.contacts.create();
	contact2.id = "9999";
	contact2.displayName = "AaPrueba Display Name";
    var contactName = new ContactName();
	contactName.formatted = "AaPrueba Name";
	contact2.name = contactName;
    alert(5);
    //contact2.phoneNumbers = "[9999999999]";
    //contact2.emails = "[yo@yo.com]";
    //contact2.save(contactoGuardado,errorGuardarContacto);
    alert(6);
	*/
	
	$(xml).find("contacto").each(function() {
		
		//OJO!!! el metodo create crea el contacto pero no lo salva.
		var contact = navigator.contacts.create();
		
		var id = $(this).find("id").text();
		contact.id = id;
		
		var displayname = $(this).find("displayname").text();
		contact.displayName = displayname;
		
		var nombre = $(this).find("nombre").text();
		var contactName = new ContactName();
		contactName.formatted = nombre;
		contact.name = contactName;
		
		var telefonos = $(this).find("telefono").text();
		/*
		if (telefonos.length > 0) {
			var arrayTelefonos = telefonos.split(" ");
			var phoneNumbers = [];
			for (int i=0; i<arrayTelefonos.length; i++) {
				phoneNumbers[i] = new ContactField('',arrayTelefonos[i],"false");
			}
			contact.phoneNumbers = phoneNumbers;
		}
		*/
		
		var emails = $(this).find("email").text();
		/*
		if (email.length > 0) {
			var arrayEmails = emails.split(" ");
			var dirEmails = [];
			for (int i=0; i<arrayEmails.length; i++) {
				var contactAddress = new ContactAddress();
				contactAddress.pref = false;
				contactAddress.formatted = arrayEmails[i];
				dirEmails[i] = contactAddress;
			}
			contact.emails = dirEmails;
		}
		*/
		var info = 'id: ' + id + '\n';
			info = info + 'displayname: ' + displayname + '\n';
			info = info + 'nombre: ' + nombre + '\n';
			info = info + 'telefonos: ' + telefonos + '\n';
			info = info + 'email: ' + emails;
		alert(info);
		
		/* OJO! Descomentar esta parte para crear contactos */
		//para almacenar el contacto, descomentar la operacion save.
		//contact.save(contactoGuardado,errorGuardarContacto);
		
	});
	
	
	
}

function errorFichero(error) {
        //alert('Error al realizar operación de ficheros: ' + error.message);
        console.log(error.code);
        
    }
    
function contactoGuardado(contact) {
	alert ('contacto guardado correctamente');
	console.log('contacto guardado correctamente');

	}
	
function errorGuardarContacto(contactError) {
	alert("Error al guardar contacto:  " + contactError.code);
	alert("Error al guardar contacto:  " + contactError.message);
	console.log("Error al guardar contacto:  " + contactError.code);
	
}