var reviews=[];



function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
    var br = document.createElement("br");
    target.appendChild(br);
}
}

var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Admin";


var divListReviews=document.getElementById("divListReviews");


function logoutUser()
{
    window.location.href="login.html";
   document.cookie='kkk';
}


function getStoredReviews(){

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    reviews = JSON.parse(xhttp.responseText);
      for(var i=0;i<reviews.length;i++)
          {
              addReviewsToDom(reviews[i]);
          }
    }
}
    xhttp.open("GET", "/homePortal/reviews", true);
    xhttp.send();  
}



function addReviewsToDom(objQuestion)
{ 
    
var divProduct = document.createElement("div");
divProduct.setAttribute("id", objQuestion.rid);    
   
var lblUserName = document.createElement("label");
lblUserName.innerHTML ="Email :- "+objQuestion.email;
lblUserName.setAttribute('style','font-weight:bold;margin:15px'); 
divProduct.appendChild(lblUserName);
    
insertBlankLine(divProduct,2);


    var lblUserDesc = document.createElement("label");
lblUserDesc.innerHTML ="Review :- "+objQuestion.desc;
lblUserDesc.setAttribute('style','font-style:Italics');
divProduct.appendChild(lblUserDesc);
divProduct.style.border="1px solid";    
    
    divProduct.style.padding="10px";
    divProduct.style.boxShadow="1px 2px 20px #888888";
    divProduct.style.width="25%";
    divProduct.style.marginTop="3%";
    divProduct.style.marginLeft="5%";
    divProduct.style.textAlign="center";
    divProduct.style.display="inline-table";
   
    divListReviews.appendChild(divProduct);
    
    divListReviews.style.marginLeft="1%";
    divListReviews.style.textAlign="center";
}