var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
var ucname="";
ucname=cook[1];
console.log(ucname);
var ucnm=cook[1].split('@');
var descArray=[];
var descId=1;
var resArray=[];




var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Hi, "+ucnm[0];


function add()
{
    var desc=document.getElementById('description').value;
      desc=desc.toString();
    desc=desc.trim();
 
  var objDesc=new Object();
    objDesc.rid=descId;
    objDesc.email=ucname;
    objDesc.desc=desc;
    descArray.push(objDesc);
    descId++;
    storeReviews();
    alert('Your review get saved..')
        
}

function storeReviews()
{
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/homePortal/reviews", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("Reviews="+JSON.stringify(descArray));
}

function getstoreReviews(){

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    resArray = JSON.parse(xhttp.responseText);
 
    descId= resArray.length+1;

       
    }
}
 xhttp.open("GET", "/homePortal/reviews", true);
    xhttp.send();  
}

