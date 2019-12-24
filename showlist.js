
var cart=[];
var ans=[];
var ansId=1;
var userPosition;
var cartId=1;
var questions=[];
var quesId=1;
var f=1;
var users=[];
var userId=1;
var pos=0;
var qty;
var userAns;
var mins=2;
var secs=mins*60;
countdown();
function countdown()
{
    setTimeout('Decrement()',60);
}

function Decrement()
{
    if(document.getElementById)
        {
            minutes=document.getElementById("minutes");
            seconds=document.getElementById("seconds");
        
       if(seconds<59)
           {
               seconds.value=secs;
           }
    else{
        minutes.value=getminutes();
        seconds.value=getseconds();
    }
    
    if(mins<1)
        {
            minutes.style.color="red";
            seconds.style.color="red";
        }
    if(mins<0)
        {
            alert('time up..');
            minutes.value=0;
            seconds.value=0;
            window.location.href="checkout.html";
        }
    else
        {
            secs--;
            setTimeout('Decrement()',1000);
        }
        }
    
}
function getminutes()
{
    mins=Math.floor(secs/60);
    return mins;
}
function getseconds()
{
    return secs-Math.round(mins*60);
}


var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
var ucname="";
ucname=cook[1];
console.log(ucname);
var ucnm=cook[1].split('@');
getStoredAns();
var giveId="";



var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Hi, "+ucnm[0];

var divListProducts=document.getElementById("divListProducts");



function logoutUser()
{
    window.location.href="login.html";
   document.cookie='kkk';
}


function deleteDOM()
{
   var childNodes =divListProducts.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     
     divListProducts.removeChild(childNodes[i]);
   }  
}

function getReviewPage()
{
    window.location.href="review.html";
}

function getStoredQuestions(){
  deleteDOM();
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    questions = JSON.parse(xhttp.responseText);
 
    quesId = ans.length+1;
for(var i=0;i<questions.length;i++)
{
       
addQuestionToDOM(questions[i]);
}
       
    }
}
 xhttp.open("GET", "/homePortal/array", true);
    xhttp.send();  
}


function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
var br = document.createElement("br");
    target.appendChild(br);
}
}



function addQuestionToDOM(objQuestion)
{  
   
    var divProduct = document.createElement("div");
    divProduct.setAttribute("id", objQuestion.name);

   
    var lblQuestionName = document.createElement("label");
    lblQuestionName.innerHTML = "Question Name : "+objQuestion.name;
    lblQuestionName.style.fontWeight="500";
    lblQuestionName.style.textAlign="left";
    lblQuestionName.style.marginLeft="5%";
 
    divProduct.appendChild(lblQuestionName);

     insertBlankLine(divProduct,1);


    var lblQuestionDesc = document.createElement("label");
    lblQuestionDesc.innerHTML ="Question Description : "+objQuestion.desc;
    lblQuestionDesc.style.fontStyle="italics";
    lblQuestionDesc.setAttribute('style','font-weight:bold');
    divProduct.appendChild(lblQuestionDesc);

    insertBlankLine(divProduct,3);

var lblfirstOption = document.createElement("label");
lblfirstOption.innerHTML = "a : "+objQuestion.firstOption+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
lblfirstOption.setAttribute('style','font-weight:bold');
divProduct.appendChild(lblfirstOption);
 //insertBlankLine(divProduct,2);

var lblsecondOption = document.createElement("label");
lblsecondOption.innerHTML = "b :  "+objQuestion.secondOption;
lblsecondOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblsecondOption);
    

    insertBlankLine(divProduct,2);
   
    
var lblthirdOption = document.createElement("label");
lblthirdOption.innerHTML = "c : "+objQuestion.thirdOption+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
lblthirdOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblthirdOption);
    

    //insertBlankLine(divProduct,2);
    
var lblfourthOption = document.createElement("label");
lblfourthOption.innerHTML = "d : "+objQuestion.fourthOption;
lblfourthOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblfourthOption);
    

    insertBlankLine(divProduct,2);

    
    
var txtans = document.createElement("input");
txtans.setAttribute("type","text");

txtans.setAttribute("id","question"+objQuestion.name);

txtans.setAttribute("placeholder", "Write your answer");
txtans.setAttribute("style","width:250px");
divProduct.appendChild(txtans);
   
insertBlankLine(divProduct,2);
var buttonAddAns = document.createElement("button");
buttonAddAns.innerHTML = "Store your answer";
divProduct.appendChild(buttonAddAns);
    
   insertBlankLine(divProduct,2); 
var buttonReview = document.createElement("button");
buttonReview.innerHTML = "Any Review or Error";
   
divProduct.appendChild(buttonReview);    

   
    divProduct.style.border="1px solid";      //adding to border
    divProduct.style.padding="10px";
    divProduct.style.boxShadow="1px 2px 20px #888888";
    divProduct.style.width="25%";
    divProduct.style.marginTop="3%";
    divProduct.style.marginLeft="5%";
    divProduct.style.textAlign="center";
    divProduct.style.display="inline-table";
   
   
   
    divListProducts.appendChild(divProduct);
    divListProducts.style.marginLeft="1%";
    divListProducts.style.textAlign="center";
    
buttonAddAns.addEventListener("click",function(event)
{
    
AddToAnsList(event,objQuestion);
});
buttonReview.addEventListener("click",function(event)
{
    
window.location.href="reviews.html";
});    
insertBlankLine(divProduct,3);
}


function checkForIndex(id)
{
    for(var i=0;i<questions.length;i++)
        {
        if(id==questions[i].name)
            {
            return i;
            }
        }
}


function AddToAnsList(event,objQuestion)
{
    var targetParent =event.target.parentNode;
    var id = targetParent.id;
    var index=checkForIndex(id);
    var name=questions[index].name;
    var originalAns=questions[index].ans;
    
    var st=String("question"+name);
 
 userAns=document.getElementById(st).value;
   
   console.log(userAns);


    var flag=1;
   
    //originalQty=parseInt(originalQty);
 
    if(!String(userAns).match(" "))
        {
       
    for(var i=0;i<ans.length;i++)
         {
             
     if(ans[i].email==ucname&&ans[i].name==name)
             {
                 
                 flag=0;
    updateProducttoList(ans[i]);
                 break;
                    }
                }
     if(flag==1)
       {

addToAnsArray(ucname,name,userAns,originalAns);
       }
   
          alert("Your answer is stored Successfully....");  
        }

    else
        {
        alert("Write your answer first..");
        }
 }



function updateProducttoList(objProduct1)
{  

objProduct1.userAns=document.getElementById("question"+objProduct1.name).value;

//alert(objProduct1.email);
    console.log(objProduct1.email);
updateCartFromDatabase(objProduct1);
}





function updateCartFromDatabase(objProduct1)
{
   
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST","/homePortal/Cartupdate", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(objProduct1));
}






function storeAns()
{
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/homePortal/cart", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("ansList="+JSON.stringify(ans));
}





function getStoredAns(){

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    ans = JSON.parse(xhttp.responseText);
   
    ansId = ans.length+1;

    }
       
}
 xhttp.open("GET", "/homePortal/cart", true);
    xhttp.send();  
}





function addToAnsArray(ucname,name,userAns,originalAnswer)
{
   
    var objAns = new Object();
    objAns.id=ansId;
    objAns.email=ucname;
    objAns.name=name;
    objAns.originalAnswer=originalAnswer;
    objAns.userAns=userAns;
    ans.push(objAns);
  
    
    ansId++;
    storeAns();  

}