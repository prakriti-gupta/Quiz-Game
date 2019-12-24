var ans=[];
var ansId;




var divListProduct=document.getElementById("divListProduct");
var total=document.getElementById("total");
var tsum=0;

var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
var ucname="";
ucname=cook[1];
var ucnm=cook[1].split('@');




var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Hi, "+ucnm[0];










function deleteFromDataBase(email){
    
    //console.log(JSON.stringify(id));
    var xhttp = new XMLHttpRequest();
    this.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/Cartdel", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   
  xhttp.send("email="+JSON.stringify(email));
}




function getStoredAns(){
   
    
    
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
    //console.log(cart.length);
    ans = JSON.parse(xhttp.responseText);
   
    ansId = ans.length-2;
 for(var i=0;i<ans.length;i++)
  {
    if(ans[i].email==ucname && ans[i].userAns==ans[i].originalAnswer)
    {
        tsum=tsum+5;
         total.innerHTML="Your Total score is "+tsum;
         }
     
           total.innerHTML="Your Total score is "+tsum;
          
     deleteFromDataBase(ans[i].email);
  }
        
total.innerHTML="Your Total score is "+tsum;    
    }
       
}
 xhttp.open("GET", "/homePortal/cart", true);
    xhttp.send();  
}







total.innerHTML="Your Total score is "+tsum;
