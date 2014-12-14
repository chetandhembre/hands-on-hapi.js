var bind = function () {
  document.getElementById('add').addEventListener('click', add)
}

var add = function (e) {
  var num1 = parseInt(document.getElementById("num1").value) || 0
  var num2 = parseInt(document.getElementById("num2").value) || 0
  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("GET", "/add?number1=" + num1 + "&number2=" + num2, true);
  oReq.send();
  
}

function reqListener () {
  var response = this.response
  if (this.status != 200) {
    response = JSON.parse(response)
    document.getElementById("error").innerText = response.error 
  } else {
    document.getElementById("result").innerText = response
  }
  
  if (response.statusCode != 200) {
    
  }
}

