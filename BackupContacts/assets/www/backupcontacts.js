
var fWriter;
var escrituraFinalizada = false;

function onDeviceReady() {
	//alert('onDeviceReady');
	$(document).on( "click", ".show-page-loading-msg", function() {
    
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });
    
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, obtenerFichero, errorFichero);
}

function realizarBackup() {
	//alert('realizarBackup');
	navigator.contacts.find(["*"], backupContactos, errorContactos,{filter: "",multiple: true,});
}

function backupContactos(contactos) {
    if (fWriter!= null && fWriter != undefined) {
	 	//alert("FWriter creado correctamente");
	 }
	//alert('El backup de ' + contactos.length + ' contactos se realizara en la ruta: ' + fWriter.fileName);
	var info = '<listacontactos>' + '\n';
	
	for (var i=0; i<contactos.length; i++) {
		var contacto = contactos[i];
		info = info + '\t' + '<contacto>' + '\n';	
		info = info + '\t' + '\t' + '<id>' + contacto.id + '</id>' +'\n';
		info = info + '\t' + '\t' + '<displayname>' + contacto.displayname + '</displayname>' + '\n';
		info = info + '\t' + '\t' + '<nombre>' + contacto.name.formatted + '</nombre>' + '\n';
	
		var numTelefonos = contacto.phoneNumbers;
		var emails = contacto.emails;
		
		if (numTelefonos != null) {
			var numTelefono = '';
			for (var j=0; j<numTelefonos.length; j++) {
				numTelefono = numTelefono + " " + numTelefonos[j].value;
				info = info + "\t" + "\t" + "<telefono>" + numTelefono + "</telefono>" +"\n";
			}
		}
		
		if (emails != null) {
			var email='';
			for (var k=0; k<emails.length; k++) {
				email = email + " " + emails[k].value;
				info = info + "\t" + "\t" + "<email>" + email + "</email>" +"\n";
			}
		}
		info = info + "\t" + "</contacto>" + "\n";
		
		if ( i!=0 && (i%50) == 0) {
			fWriter.seek(fWriter.length);
			fWriter.write(info);
			while (escrituraFinalizada == false) {
				//alert('esperando');
			}
			info = '';
		
		}
	}
	info = info + '</listacontactos>' + '\n';
	fWriter.seek(fWriter.length);
	fWriter.write(info);
	alert('Backup Finalizado Correctamente');
	$.mobile.loading( "hide" );
	fWriter.abort();
}

function obtenerFichero(fileSystem) {
		//alert("Nombre: " + fileSystem.name);
		//alert("Root: " + fileSystem.root.fullPath);
        fileSystem.root.getFile("contacts.xml", {create: true, exclusive: false}, gotFileEntry, errorFichero);
    }
    
function gotFileEntry(fileEntry) {
	//fileEntry.createWriter(asignaWriter, errorFichero);
	//alert('creando fWriter');
	//fWriter = new FileWriter(paths[0] + "write.txt", true);
	fWriter = new FileWriter(fileEntry.fullPath, true);
	fWriter.onwritestart = function (event) {
		escrituraFinalizada = false;
		//alert ('comenzando escritura');
	}
	fWriter.onwriteend = function(event) {
        escrituraFinalizada = true;
        //alert ('escritura finalizada');
    };
	//alert('Fwriter CREADO en: ' + fWriter.fileName );
}

function asignaWriter(writer) {
	fWriter = writer;
	if (fWriter!= null && fWriter != undefined) {
	 	//alert("FWriter creado correctamente");
	 	//alert(fWriter.fileName);
	 }
}   

function errorFichero(error) {
        alert('Error al realizar operación de ficheros: ' + error.message);
        console.log(error.code);
        
    }
    
function errorContactos(error) {
	console.log('error contactos: ' + error);
	alert ('Error al recuperar lista de contactos: ' + error.message + ' error: ' + error.code);
}

function errorBBDD(error) {
	alert ('Error al procesar SQL: ' + error.message + " error: " + error.code);
	console.log('Error al procesar SQL: ' + error);
}


function exitoBBDD(error) {
	console.log('Ejecucion de sql correcta');
	var db = window.openDatabase("NBAPLAYERS", "1.0", "NBAPLAYERS", 1000000);
	db.transaction(cargarListaEquipos,errorBBDD);
	
}
