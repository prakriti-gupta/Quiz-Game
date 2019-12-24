var questions=[];
var prid=1;
var check=true;
var quesId=0;
var aAddProduct=document.getElementById("aAddProduct");
var divAddProducts=document.getElementById("divAddQuestions");
var divListProducts=document.getElementById("divListProducts");
var aAddToCart=document.getElementById("aAddToCart");

//getStoredQuestions();

var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Admin";


aAddProduct.addEventListener("click",function(event)
{
    //alert('uuu');
   if(check)
createProductPanel();
divAddProducts.setAttribute("style","visibility:visible");
    check=false;
   
});


function logoutUser()
{
    window.location.href="login.html";
   document.cookie='kkk';
}


function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
    var br = document.createElement("br");
    target.appendChild(br);
}
}


function openNav() 
{
     
    console.log("in nav");
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() 
{
    
    console.log('out nav');
  document.getElementById("myNav").style.width = "0%";
}


function deleteProductDiv(e)
{
    var targetParent = event.target.parentNode;
    //console.log(targetParent);
    var selectedProductIndex = getProductIndex(targetParent.id);
    deleteFromDataBase(questions[selectedProductIndex].name);
    removeFromProductsArray(selectedProductIndex);
    targetParent.parentNode.removeChild(targetParent);
}


function editProductDiv(event)
{
deleteNewProductPanel2();
  
var objProduct = new Object();
var targetParent = event.target.parentNode;
var name = targetParent.id;

for(var i=0;i<questions.length;i++)
{
if (questions[i].name == name)
{
   createProductPanel2(questions[i]);
    break;
}
}
}


function getProductIndex(id)
{
    for (var i = 0; i < questions.length; i++)
{
        if (questions[i].name == id)
return i;
    }
}


function removeFromProductsArray(selectedProductIndex)
{
questions.splice(selectedProductIndex,1);
//console.log(products);
}







function updateQuestiontoList(objProduct1)
{
    
objProduct1.name=document.getElementById("txtQuestionName").value;
objProduct1.desc=document.getElementById("txtQuestionDesc").value;
objProduct1.firstOption=document.getElementById("txtQuestionOption1").value;
objProduct1.secondOption=document.getElementById("txtQuestionOption2").value;
objProduct1.thirdOption=document.getElementById("txtQuestionOption3").value; 
objProduct1.fourthOption=document.getElementById("txtQuestionOption4").value;
objProduct1.ans=document.getElementById("txtans").value;    
var inif=false;
    
for(var i=0;i<questions.length;i++)
{
if(objProduct1.name==questions[i].name)
{
questions[i]=objProduct1;
    inif=true;
break;
}
}
    if(inif)
   {
        updateFromDatabase(objProduct1);
         getStoredQuestions();
       deleteNewProductPanel2();
   }

}
function updateFromDatabase(objProduct1)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(objProduct1));
}

function hideAddNewnk()
{
    aAddProduct.setAttribute("style","visibility:hidden");
}

function unhideAddNewProductLink()
{
   
aAddProduct.setAttribute("style","visibility:visible");
}




function deleteNewProductPanel()
{
   var childNodes = divAddProducts.childNodes;
   
   for (var i = 0; childNodes.length >0;)
   {
       
     divAddProducts.removeChild(childNodes[i]);
   }
   

}

function deleteDOM()
{
   var childNodes = divListProducts.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     
     divListProducts.removeChild(childNodes[i]);
   }  
}

function deleteNewProductPanel2()
{
   var childNodes = divAddProducts.childNodes;
   for (var i = 0; childNodes.length > 0;)
   {
     divAddProducts.removeChild(childNodes[i]);
   }
}





function addQuestiontoList()
{
var objQuestion = new Object();
objQuestion.id=quesId;
 
objQuestion.name=document.getElementById("txtQuestionType").value;
objQuestion.desc=document.getElementById("txtQuestionDesc").value;
objQuestion.firstOption=document.getElementById("txtQuestionOption1").value;
objQuestion.secondOption=document.getElementById("txtQuestionOption2").value;
objQuestion.thirdOption=document.getElementById("txtQuestionOption3").value;
objQuestion.fourthOption=document.getElementById("txtQuestionOption4").value;
objQuestion.ans=document.getElementById("txtQuestionAns").value;    
if(objQuestion.name=="" || objQuestion.desc=="" || objQuestion.firstOption=="" || objQuestion.secondOption=="" || objQuestion.thirdOption=="" || objQuestion.fourthOption=="" || objQuestion.ans=="")
{
alert("all fields are compulsory");
}
else
{
questions.push(objQuestion);
addQuestionToDOM(objQuestion);
storeQuestions();
deleteNewProductPanel();
quesId++;
}
}




function deleteFromDataBase(name){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name="+JSON.stringify(name));
}




function storeQuestions(){
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/homePortal/array", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("QuestionList="+JSON.stringify(questions));
}



function getStoredQuestions(){
    deleteDOM();
  
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    questions = JSON.parse(xhttp.responseText);
     
    quesId = questions.length+1;
for(var i=0;i<questions.length;i++)
{
addQuestionToDOM(questions[i]);
}
    }
}
 xhttp.open("GET", "/homePortal/array", true);
    xhttp.send();  
}




function addQuestionToDOM(objQuestion)
{  
   
   
var divProduct = document.createElement("div");
divProduct.setAttribute("id", objQuestion.name);

   
var lblQuestionName = document.createElement("label");
lblQuestionName .innerHTML ="Question Type :-"+objQuestion.name;
lblQuestionName .setAttribute('style','font-weight:bold;margin:15px');
  
divProduct.appendChild(lblQuestionName);
insertBlankLine(divProduct,2);


var lblQuestionDesc = document.createElement("label");
lblQuestionDesc.innerHTML ="Question Description :- "+objQuestion.desc;
lblQuestionDesc.setAttribute('style','font-style:Italics');
    
    divProduct.appendChild(lblQuestionDesc);
       

    insertBlankLine(divProduct,2);

var lblfirstOption = document.createElement("label");
lblfirstOption.innerHTML = "First Option :- "+objQuestion.firstOption;
lblfirstOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblfirstOption);
    

    insertBlankLine(divProduct,2);

var lblsecondOption = document.createElement("label");
lblsecondOption.innerHTML = "Second Option :- "+objQuestion.secondOption;
lblsecondOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblsecondOption);
    

    insertBlankLine(divProduct,2);
    
    
var lblthirdOption = document.createElement("label");
lblthirdOption.innerHTML = "Third Option :- "+objQuestion.thirdOption;
lblthirdOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblthirdOption);
    

    insertBlankLine(divProduct,2);
    
var lblfourthOption = document.createElement("label");
lblfourthOption.innerHTML = "Fourth Option :- "+objQuestion.fourthOption;
lblfourthOption.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblfourthOption);
    

    insertBlankLine(divProduct,2);
    
var lblans = document.createElement("label");
lblans.innerHTML = "Correct Answer :- "+objQuestion.ans;
lblans.setAttribute('style','font-weight:bold');
  
divProduct.appendChild(lblans);
    

    insertBlankLine(divProduct,2);    
   
   
var buttonEdit = document.createElement("button");
buttonEdit.innerHTML = "edit";
buttonEdit.setAttribute('style','border-radius:12px;')
divProduct.setAttribute('style','border:1px solid black;');
divProduct.appendChild(buttonEdit);
//divListProducts.appendChild(divProduct);
buttonEdit.addEventListener("click",function(event)
{
    openNav();
editProductDiv(event);

});

var buttonDelete = document.createElement("button");
buttonDelete.innerHTML = "Delete";
buttonDelete.setAttribute("style","margin-left:20px;border-radius:12px");
divProduct.appendChild(buttonDelete);
   
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
   
   
   
buttonDelete.addEventListener("click",function(event)
{
    deleteProductDiv(event);
});

    insertBlankLine(divProduct,2);


}








function createProductPanel()
{

var fildset=document.createElement('fieldset');
fildset.setAttribute('style','font-size:24px;color:white;width:50%;text-align:center;margin-left:22%;');
var div=document.createElement('div');
var lblAddProduct=document.createElement("label");
lblAddProduct.innerHTML = "Add New Question";
lblAddProduct.setAttribute("style","font-weight:bold;text-align:center;");
div.setAttribute('style','color:white;');
div.appendChild(lblAddProduct);
divAddProducts.appendChild(div);
divAddProducts.appendChild(fildset);
insertBlankLine(divAddProducts,2);

var txtQuestionType = document.createElement("input");
var label4=document.createElement('label');
label4.innerHTML="Question Type :-";
label4.setAttribute('style','font-weight:bold');
txtQuestionType.setAttribute("type","text");
txtQuestionType.setAttribute("id","txtQuestionType");
txtQuestionType.setAttribute("placeholder", "Enter the Question Type");
txtQuestionType.setAttribute("style","");
fildset.appendChild(label4);
fildset.appendChild(txtQuestionType);

insertBlankLine(fildset,2);

var txtQuestionDesc = document.createElement("input");
var label3=document.createElement('label');
label3.innerHTML="Question Description :-";
label3.setAttribute('style','font-weight:bold');
txtQuestionDesc.setAttribute("type","text");
txtQuestionDesc.setAttribute("id","txtQuestionDesc");
txtQuestionDesc.setAttribute("placeholder", "Enter the question description");
txtQuestionDesc.setAttribute("style","width:250px; height:50px");
fildset.appendChild(label3);
fildset.appendChild(txtQuestionDesc);

insertBlankLine(fildset,2);

var txtQuestionOption1 = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="First Option :-";
label2.setAttribute('style','font-weight:bold');
txtQuestionOption1.setAttribute("type","text");
txtQuestionOption1.setAttribute("id","txtQuestionOption1");
txtQuestionOption1.setAttribute("placeholder", "Enter the first option");
txtQuestionOption1.setAttribute("style","width:250px;margin-left:44px");
fildset.appendChild(label2);
fildset.appendChild(txtQuestionOption1);

insertBlankLine(fildset,2);

var txtQuestionOption2 = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Second Option :-";
label1.setAttribute('style','font-weight:bold');
txtQuestionOption2.setAttribute("type","text");
txtQuestionOption2.setAttribute("id","txtQuestionOption2");
txtQuestionOption2.setAttribute("placeholder", "Enter the second option");
txtQuestionOption2.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtQuestionOption2);

insertBlankLine(fildset,2);
    
var txtQuestionOption3 = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Third Option :-";
label1.setAttribute('style','font-weight:bold');
txtQuestionOption3.setAttribute("type","text");
txtQuestionOption3.setAttribute("id","txtQuestionOption3");
txtQuestionOption3.setAttribute("placeholder", "Enter the third option");
txtQuestionOption3.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtQuestionOption3);

insertBlankLine(fildset,2);    
   
var txtQuestionOption4 = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Fourth Option :-";
label1.setAttribute('style','font-weight:bold');
txtQuestionOption4.setAttribute("type","text");
txtQuestionOption4.setAttribute("id","txtQuestionOption4");
txtQuestionOption4.setAttribute("placeholder", "Enter the fourth option");
txtQuestionOption4.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtQuestionOption4);

insertBlankLine(fildset,2);

var txtQuestionAns = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Correct Answer :-";
label1.setAttribute('style','font-weight:bold');
txtQuestionAns.setAttribute("type","text");
txtQuestionAns.setAttribute("id","txtQuestionAns");
txtQuestionAns.setAttribute("placeholder", "Enter the fourth option");
txtQuestionAns.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtQuestionAns);

insertBlankLine(fildset,2);
   
   

var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Add Question";
btnAddButton.setAttribute('style','border-radius:12px');
fildset.appendChild(btnAddButton);

    btnAddButton.addEventListener("click", function(event)
{
addQuestiontoList();
        check=true;
        closeNav();
}
);

    var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
btnCancelButton.setAttribute('style','border-radius:12px;margin-left:25px');
fildset.appendChild(btnCancelButton);
divAddProducts.appendChild(fildset);

    btnCancelButton.addEventListener("click", function(event)
{
        check=true;
deleteNewProductPanel();
createProductPanel();
        closeNav();
}
);

}







function createProductPanel2(objProduct)
{
   var fildset=document.createElement('fieldset');
fildset.setAttribute('style','font-size:24px;color:white;width:50%;text-align:center;margin-left:22%;');
var div=document.createElement('div');
var lblAddProduct=document.createElement("label");
lblAddProduct.innerHTML = "Update Question";
lblAddProduct.setAttribute("style","font-weight:bold;text-align:center;");
div.setAttribute('style','color:white;');
div.appendChild(lblAddProduct);
divAddProducts.appendChild(div);
insertBlankLine(fildset,2);

var txtQuestionName = document.createElement("input");
var label4=document.createElement('label');
label4.innerHTML="Question Type :-";
label4.setAttribute('style','font-weight:bold');
txtQuestionName.setAttribute("type","text");
txtQuestionName.setAttribute("id","txtQuestionName");
txtQuestionName.setAttribute("value",objProduct.name);
txtQuestionName.setAttribute("style","width:250px;margin-left:38px");
fildset.appendChild(label4);
fildset.appendChild(txtQuestionName);

insertBlankLine(fildset,2);
   
var txtQuestionDesc = document.createElement("input");
var label3=document.createElement('label');
label3.innerHTML="Question Description :-";
label3.setAttribute('style','font-weight:bold');
txtQuestionDesc.setAttribute("type","text");
txtQuestionDesc.setAttribute("id","txtQuestionDesc");
txtQuestionDesc.setAttribute("value",objProduct.desc);
txtQuestionDesc.setAttribute("style","width:250px; height:50px;");
fildset.appendChild(label3);
fildset.appendChild(txtQuestionDesc);

insertBlankLine(fildset,2);

var txtQuestionOption1 = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="First Option :-";
label2.setAttribute('style','font-weight:bold');
txtQuestionOption1.setAttribute("type","text");
txtQuestionOption1.setAttribute("id","txtQuestionOption1");
txtQuestionOption1.setAttribute("value",objProduct.firstOption);
txtQuestionOption1.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtQuestionOption1);

insertBlankLine(fildset,2);

var txtQuestionOption2 = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Second Option :-";
label2.setAttribute('style','font-weight:bold');
txtQuestionOption2.setAttribute("type","text");
txtQuestionOption2.setAttribute("id","txtQuestionOption2");
txtQuestionOption2.setAttribute("value",objProduct.secondOption);
txtQuestionOption2.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtQuestionOption2);

insertBlankLine(fildset,2);


var txtQuestionOption3 = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Third Option :-";
label2.setAttribute('style','font-weight:bold');
txtQuestionOption3.setAttribute("type","text");
txtQuestionOption3.setAttribute("id","txtQuestionOption3");
txtQuestionOption3.setAttribute("value",objProduct.thirdOption);
txtQuestionOption3.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtQuestionOption3);

insertBlankLine(fildset,2);    
    
var txtQuestionOption4 = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Fourth Option :-";
label2.setAttribute('style','font-weight:bold');
txtQuestionOption4.setAttribute("type","text");
txtQuestionOption4.setAttribute("id","txtQuestionOption4");
txtQuestionOption4.setAttribute("value",objProduct.fourthOption);
txtQuestionOption4.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtQuestionOption4);

insertBlankLine(fildset,2);  
    
var txtans = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Fourth Option :-";
label2.setAttribute('style','font-weight:bold');
txtans.setAttribute("type","text");
txtans.setAttribute("id","txtans");
txtans.setAttribute("value",objProduct.ans);
txtans.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtans);

insertBlankLine(fildset,2);      
    
var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Update Question";
btnAddButton.setAttribute('style','border-radius:12px');
fildset.appendChild(btnAddButton);

    btnAddButton.addEventListener("click", function(event)
{
       
updateQuestiontoList(objProduct);
     closeNav();  
}
);

 var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
btnCancelButton.setAttribute('style','border-radius:12px;margin-left:25px');
fildset.appendChild(btnCancelButton);
divAddProducts.appendChild(fildset);

    btnCancelButton.addEventListener("click", function(event)
{
deleteNewProductPanel();
        closeNav();
createProductPanel2();
}
);
}