

function doupload(){
  var mode = document.getElementById("modo").value;
  var file = document.getElementById("file").files[0];
  var password = document.getElementById("password").value;
  var content;
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    content = evt.target.result;
    var result;
    if(mode === "Cifrar"){
      var cipher = encryptContentWithPassword(content, password);
      result = cipher;
      // document.getElementById("response").innerHTML = cipher;
    } else {
      var uncipher = decryptContentWithPassword(content, password);
      result = uncipher;
      // document.getElementById("response").innerHTML = uncipher;
    }
    var outFile = new File([result], 'out.txt', { type: 'text/plain', });
    var link = document.createElement('a');
    const url = URL.createObjectURL(outFile);

    link.href = url;
    link.download = outFile.name;
    link.innerText = "texto";
    document.getElementById("response").innerHTML = "";
    document.getElementById("response").appendChild(link);
    // link.click()

    // document.body.removeChild(link)
    // window.URL.revokeObjectURL(url)
  }
}

function encryptContentWithPassword(content, password){
  let data = CryptoJS.AES.encrypt(content, password).toString();
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
}

function decryptContentWithPassword(content, password){
  let decData = CryptoJS.enc.Base64.parse(content).toString(CryptoJS.enc.Utf8)
  return CryptoJS.AES.decrypt(decData, password).toString(CryptoJS.enc.Utf8);
}