/**
 * GOOGLE APPS SCRIPT FOR GOOGLE DRIVE PHOTO GALLERY
 * Folder: https://drive.google.com/drive/folders/157fqgUn1Hdf-t6pL4JHr6dTqtlKnGn4c
 * 
 * HOW TO DEPLOY IN 60 SECONDS:
 * 1. Go to https://script.google.com/ and click "New Project".
 * 2. Paste all the code below into the editor (replace everything in Code.gs).
 * 3. Click "Deploy" (top-right button) -> "New deployment".
 * 4. Select type: "Web app" (click the gear icon ⚙️ next to 'Select type').
 * 5. Configuration:
 *    - Description: "Birthday Photos API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (IMPORTANT: select 'Anyone')
 * 6. Click "Deploy", authorize permissions when prompted, and copy the Web App URL (starts with https://script.google.com/macros/s/...).
 * 7. In the Birthday Website, click "🔗 Connect Google Drive" in the photo gallery and paste the Web App URL!
 */

function doGet(e) {
  var folderId = "157fqgUn1Hdf-t6pL4JHr6dTqtlKnGn4c"; // Your Google Drive folder ID
  
  if (e && e.parameter && e.parameter.folderId) {
    folderId = e.parameter.folderId;
  }
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var images = [];
    var count = 1;
    
    while (files.hasNext()) {
      var file = files.next();
      var mimeType = file.getMimeType();
      var fileName = file.getName();
      
      // Filter image files (JPEG, PNG, WEBP, HEIC, GIF)
      var isImage = mimeType.indexOf("image/") !== -1 || 
                    fileName.match(/\.(jpg|jpeg|png|webp|heic|gif|JPG|JPEG|PNG|WEBP|HEIC)$/i);
      
      if (isImage) {
        var fileId = file.getId();
        
        // Google CDN direct rendering URLs
        var directImageUrl = "https://lh3.googleusercontent.com/d/" + fileId + "=w1600";
        var thumbnailUrl = "https://lh3.googleusercontent.com/d/" + fileId + "=w600";
        var rawDownloadUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
        
        images.push({
          id: fileId,
          title: fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || ("Memory #" + count),
          date: Utilities.formatDate(file.getDateCreated(), "GMT", "MMMM yyyy"),
          image: directImageUrl,
          thumbnail: thumbnailUrl,
          downloadUrl: rawDownloadUrl,
          note: "A priceless memory from our journey together. Forever treasured in my heart.",
          likes: Math.floor(Math.random() * 25) + 15
        });
        count++;
      }
    }
    
    // Return formatted JSON with CORS headers enabled
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      folderId: folderId,
      totalCount: images.length,
      photos: images
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
