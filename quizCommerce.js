var express=require("express");
var app=express();
var AWS = require('aws-sdk');
var mongoose =require('mongoose');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var exphbs=require('express-handlebars');
require('dotenv').config();
var otpToken="";

mongoose.connect("mongodb://localhost/quiz",{ useNewUrlParser: true }, );


var session=require('express-session');
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
    secret:"kjhkk",
    resave:true,
    saveUninitialized: true
}))


//app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));



//connection with database


var Schema=mongoose.Schema;
var username;
let Question=new Schema({
    name:String,
    desc:String,
    firstOption:String,
    secondOption:String,
    thirdOption:String,
    fourthOption:String,
    ans:String,
});


let SignIn=new Schema({

    fname:String,
    lname:String,
    email:String,
    password:String,
    phoneNo:Number,
 
   
});

let ansUser=new Schema({
    id:Number,
    email:String,
    name:String,
    originalAnswer:String,
    userAns:String,
});

let userReview=new Schema({
    rid:Number,
    email:String,
    desc:String,
})

var ques = mongoose.model('question',Question);
var signin=mongoose.model('signin',SignIn);
var ans=mongoose.model('ansUser',ansUser);
var reviews=mongoose.model('reviews',userReview);



app.post('/sign',(req,res) => {
 var len=JSON.parse(req.body.userList).length;
    var sData=new signin(); 
 sData.id=JSON.parse(req.body.userList)[len-1].id;    
 sData.fname=JSON.parse(req.body.userList)[len-1].fname;    
 sData.lname=JSON.parse(req.body.userList)[len-1].lname;
 sData.email=JSON.parse(req.body.userList)[len-1].email;
  sData.password=JSON.parse(req.body.userList)[len-1].password;
    sData.phoneNo=JSON.parse(req.body.userList)[len-1].phoneNo;

 sData.save(function(err)
{
if(err)
    {
        console.log("here Error");
    }
    res.redirect('/homePortal.html');
});        
});



app.get('/sign',(req,res)=>{
    console.log('running it');
    signin.find({},function(err,docs){
        if(err)
            {
                console.log("who error");
            }
       
        res.send(docs);
       
    });
});


app.get("/homePortal.html",function(req,res)
       {
    res.sendFile(__dirname+"/homePortal.html");
});




app.get('/homePortal/array',(req,res)=>{
    console.log('running it');
    ques.find({},function(err,docs){
        if(err)
            {
                console.log("hello error");
            }
       
        res.send(docs);
       
    });
});


app.post('/homePortal/update',(req,res)=>{

    var ob=(JSON.parse(req.body.obj));
 console.log(ob);
    var myquery = { name: ob.name };
  var newvalues = { $set: { name: ob.name, desc:ob.desc,firstOption:ob.firstOption,secondOption:ob.secondOption,thirdOption:ob.thirdOption,fourthOption:ob.fourthOption,ans:ob.ans } };
   
    ques.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("here 1 document updated");

  });
});


app.post('/homePortal/Cartupdate',(req,res)=>{

    var ob=(JSON.parse(req.body.obj));
 
    var myquery = { id: ob.id };
  var newvalues = { $set: { id: ob.id,name: ob.name, email:ob.email,originalAnswer:ob.originalAnswer,userAns:ob.userAns } };
   
    ans.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("yes 1 document updated");

  });
});


app.post('/homePortal/delete',(req,res)=>{
   
ques.findOneAndRemove({name:JSON.parse(req.body.name)}, function(err){
        if (err){
            throw err;
        }
       
        console.log('deleted');
    });
});

app.post('/homePortal/Cartdel',(req,res)=>{
    console.log(JSON.parse(req.body.email));
    ans.findOneAndRemove({email:JSON.parse(req.body.email)}, function(err){
 
        if (err){
            throw err;
        }
        console.log('deleted');
    });
});



app.post('/homePortal/array',(req,res) => {
 var len=JSON.parse(req.body.QuestionList).length;
    var sData=new ques();      
 sData.name=JSON.parse(req.body.QuestionList)[len-1].name;
 sData.desc=JSON.parse(req.body.QuestionList)[len-1].desc;

  sData.firstOption=JSON.parse(req.body.QuestionList)[len-1].firstOption;
    sData.secondOption=JSON.parse(req.body.QuestionList)[len-1].secondOption;
      sData.secondOption=JSON.parse(req.body.QuestionList)[len-1].secondOption;
      sData.thirdOption=JSON.parse(req.body.QuestionList)[len-1].thirdOption;
     sData.fourthOption=JSON.parse(req.body.QuestionList)[len-1].fourthOption;
     sData.ans=JSON.parse(req.body.QuestionList)[len-1].ans;

 sData.save(function(err)
{
if(err)
    {
        console.log("here Error");
    }
    res.redirect('/homePortal.html');
});        
});



app.get('/homePortal/cart',(req,res)=>{
    console.log('running it');
    ans.find({},function(err,docs){
        if(err)
            {
                console.log("hello error");
            }
       
        res.send(docs);
       
    });
});



app.get('/homePortal/reviews',(req,res)=>{
    console.log('running it');
    reviews.find({},function(err,docs){
        if(err)
            {
                console.log("hello error");
            }
       
        res.send(docs);
       
    });
});




app.post('/homePortal/cart',(req,res) => {
 var len=JSON.parse(req.body.ansList).length;
    var sData=new ans();
 sData.id= JSON.parse(req.body.ansList)[len-1].id;
    console.log(sData.id);
sData.email=JSON.parse(req.body.ansList)[len-1].email;
sData.name=JSON.parse(req.body.ansList)[len-1].name;
sData.originalAnswer=JSON.parse(req.body.ansList)[len-1].originalAnswer;   
sData.userAns=JSON.parse(req.body.ansList)[len-1].userAns;    

 sData.save(function(err)
{
if(err)
    {
        console.log("yes Error");
    }
     console.log('saved');
    res.redirect('/homePortal.html');
});        
});


app.post('/homePortal/reviews',(req,res) => {
 var len=JSON.parse(req.body.Reviews).length;
    var sData=new reviews();
 sData.rid= JSON.parse(req.body.Reviews)[len-1].rid;
   
sData.email=JSON.parse(req.body.Reviews)[len-1].email;
sData.desc=JSON.parse(req.body.Reviews)[len-1].desc;
 

 sData.save(function(err)
{
if(err)
    {
        console.log("yes Error");
    }
     console.log('saved');
    
});        
});




app.post('/verification.html',function(req,res)
        {
   var number=req.body.number;
    var val = Math.floor(1000 + Math.random() * 9000);
    
    var otp=val.toString();
    otpToken=val;
    var x ={
        
  send: function(number) {
    console.log(number);
      console.log(otp);
       var params = {
  Message: 'Your one time password is '+otp, /* required */
  PhoneNumber: number,
};

AWS.config.update({accessKeyId:"*",secretAccessKey:"*" ,region: 'us-west-2'});
      
// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: 'latest'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log("MessageID is " + data.MessageId);
      res.redirect('/verification.html');
  }).catch(
    function(err) {
    console.error("error");
  });
}
}  
  x.send('+91'+req.body.number);  
});




app.post('/check',function(req,res)
        {
   var id=req.body.id;
    if(id==otpToken)
        {
            res.redirect('/view.html');
        }
    else
        {
            console.log('Wrong');
        }
  
});





app.get("/homePage.html",function(req,res)
       {
    res.sendFile(__dirname+"/homePage.html");
});

app.get("/view.html",function(req,res)
       {
    res.sendFile(__dirname+"/view.html");
});


app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});

app.get("/authentication.html",function(req,res)
       {
    res.sendFile(__dirname+"/authentication.html");
});

app.get("/verification.html",function(req,res)
       {
    res.sendFile(__dirname+"/verification.html");
});


app.get("/signIn.html",function(req,res)
       {
    res.sendFile(__dirname+"/signIn.html");
});


app.get("/manageProducts.html",function(req,res)
       {
    res.sendFile(__dirname+"/manageProducts.html");
});


app.get("/checkOut.html",function(req,res)
       {
    res.sendFile(__dirname+"/checkOut.html");
});


app.get("/reviews.html",function(req,res)
       {
    res.sendFile(__dirname+"/reviews.html");
});


app.get("/thanksForShopping.html",function(req,res)
       {
    res.sendFile(__dirname+"/thanksForShopping.html");
});



app.listen(8000);