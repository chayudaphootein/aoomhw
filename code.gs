function doGet(e) {
  var htmlOutput =  HtmlService.createTemplateFromFile('index');
  htmlOutput.message = '';
  return htmlOutput.evaluate();
}

function doPost(e) {
  var folder = DriveApp.getFolderById('xxx');//เปลี่ยนเป็นไอดีโฟลเดอร์เก็บไฟล์ของท่าน;
  var data = Utilities.base64Decode(e.parameter.fileData);
  var blob = Utilities.newBlob(data, e.parameter.mimeType, e.parameter.fileName);
  var file = folder.createFile(blob);
  var fileURL = file.getUrl();
      recordData(
        e.parameter.username, 
        e.parameter.nickname,
        e.parameter.phone,  
        fileURL
        );
  var htmlOutput =  HtmlService.createTemplateFromFile('success');
      htmlOutput.message = 'อัปโหลดไฟล์เรียบร้อยแล้ว';
  return htmlOutput.evaluate();
}

function recordData(username, nickname, phone, fileURL){
  var token = 'xxx'
  msg = 'มีนักเรียนส่งงาน ชื่อ '+username
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
      ss.appendRow([
        new Date(), 
        username, 
        nickname, 
        "'"+phone, 
        fileURL
        ]);
        NotifyApp.sendNotify(token,msg)
}

function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}
