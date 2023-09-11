// TODO Before you start using this sample, you must run the setUp() 
// function in the Setup.gs file.

// Application constants
const APP_TITLE = "Familias";
const APP_FOLDER_NAME = "Familias (File responses)";

// Identifies the subfolder form item
const APP_PROBE_ITEM = "NOMBRE DE PRUEBA/ACTIVIDAD";
const APP_MODEL_ITEM = "MODELO";
const APP_FAMILY_ITEM = "FAMILIA";
const APP_TYPE_ITEM = "TIPO";
const APP_MODEL_NONE = "<None>";

/**
 * Gets the file uploads from a form response and moves files to the corresponding subfolder.
 *  
 * @param {object} event - Form submit.
 */
function onFormSubmit(e) {
  try {
    // Gets the application root folder.
    var destFolder = getFolder_(APP_FOLDER_NAME);

    // Gets all form responses.
    let itemResponses = e.response.getItemResponses();

    // Determines the subfolder to route the file to, if any.
    var familyFolderName;
    var modelFolderName;
    var typeFolderName;
    var probeFolderName;


    let family = itemResponses.filter((itemResponse) =>
      itemResponse.getItem().getTitle().toString() === APP_FAMILY_ITEM);

    let model = itemResponses.filter((itemResponse) =>
      itemResponse.getItem().getTitle().toString() === APP_MODEL_ITEM);

    let type = itemResponses.filter((itemResponse) =>
      itemResponse.getItem().getTitle().toString() === APP_TYPE_ITEM);

    let probe = itemResponses.filter((itemResponse) =>
      itemResponse.getItem().getTitle().toString() === APP_PROBE_ITEM);

    // ------------------------ ACA TE QUEDASTE 17/05 -----------------------------------------------

    // ---------------- PROCEDIMIENTO PARA PODER OBTENER LAS SELECCIONES DE LAS RESPUESTAS ------------

    // Gets the destination subfolder name, but ignores if APP_SUBFOLDER_NONE was selected;

    if (family.length > 0) {
      if (family[0].getResponse() != APP_MODEL_NONE) {
        familyFolderName = family[0].getResponse();
      }
    }

    if (model.length > 0) {
      if (model[0].getResponse() != APP_MODEL_NONE) {
        modelFolderName = model[0].getResponse();
      }
    }

    if (type.length > 0) {
      if (type[0].getResponse() != APP_MODEL_NONE) {
        typeFolderName = type[0].getResponse();
      }
    }

    if (probe.length > 0) {
      if (probe[0].getResponse() != "") {
        probeFolderName = probe[0].getResponse();
      }
    }

    // ------- PROCEDIMIENTO PARA CREAR LAS SUBCARPETAS ------------------------------------------

    // Gets the subfolder or creates it if it doesn't exist.
    if (familyFolderName != undefined) {
      familyDestFolder = getSubFolder_(destFolder, familyFolderName)
    }

    if (modelFolderName  != undefined) {
      modelDestFolder = getSubFolder_(DriveApp.getFolderById(familyDestFolder.getId()), modelFolderName);
    }

    if (typeFolderName  != undefined) {
      typeDestFolder = getSubFolder_(DriveApp.getFolderById(modelDestFolder.getId()), typeFolderName);
    }

    if (probeFolderName != undefined) {
      probeDestFolder = getSubFolder_(DriveApp.getFolderById(typeDestFolder.getId()), probeFolderName);
    }

    console.log(`Destination folder to use:
    Name: ${destFolder.getName()}
    ID: ${destFolder.getId()}
    URL: ${destFolder.getUrl()}`)

    // Gets the file upload response as an array to allow for multiple files.
    let fileUploads = itemResponses.filter((itemResponse) => itemResponse.getItem().getType().toString() === "FILE_UPLOAD")
      .map((itemResponse) => itemResponse.getResponse())
      .reduce((a, b) => [...a, ...b], []);

    // Moves the files to the destination folder.
    if (fileUploads.length > 0) {
      fileUploads.forEach((fileId) => {
        DriveApp.getFileById(fileId).moveTo(probeDestFolder);
        console.log(`File Copied: ${fileId}`)
      });
    }

    // Move the new subFolder to another File

    

  var htmlBody1 = '<h1 style="color:DarkMagenta;font-size:40px;"> NUEVO(S) ARCHIVO(S) COMPARTIDO(S) </h1> <br> <ol>';

  htmlBody1 += '<p style="color:black;font-size:20px;">' + "Hola, nuevos archivos fueron compartidos. Revisar el resumen de formulario para saber cuáles son."  + '</p>';

  htmlBody1 += '</ol>';
  
  GmailApp.sendEmail('yarilenka.benites@ferreyros.com.pe', '¡ARCHIVOS NUEVOS!', '', {htmlBody:htmlBody1});
  GmailApp.sendEmail('ernesto.parraga@ferreyros.com.pe', '¡ARCHIVOS NUEVOS!', '', {htmlBody:htmlBody1});
  GmailApp.sendEmail('diseno.instruccional@ferreyros.com.pe', '¡ARCHIVOS NUEVOS!', '', {htmlBody:htmlBody1});

  }
  catch (err) {
    console.log(err);
  }
}


/**
 * Returns a Drive folder under the passed in objParentFolder parent
 * folder. Checks if folder of same name exists before creating, returning 
 * the existing folder or the newly created one if not found.
 *
 * @param {object} objParentFolder - Drive folder as an object.
 * @param {string} subFolderName - Name of subfolder to create/return.
 * @return {object} Drive folder
 */
function getSubFolder_(objParentFolder, subFolderName) {

  // Iterates subfolders of parent folder to check if folder already exists.
  const subFolders = objParentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === subFolderName) {
      return folder;
    }
  }
  // Creates a new folder if one doesn't already exist.
  return objParentFolder.createFolder(subFolderName)
    .setDescription(`Created by ${APP_TITLE} application to store uploaded Forms files.`);
}
