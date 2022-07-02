//Requiring Modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { application } = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//get request for sign-up html
app.get('/',function(req,res){
    res.sendFile(__dirname + '/sign-up.html');
    // res.sendFile(__dirname + '/style.css');
})
//get request for sign-up css
app.get('/style.css',function(req,res){
    res.sendFile(__dirname+"/style.css");
})
//post to collect data from sign-up form
app.post('/',function(req,resp){
    const email = req.body.email;
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const  data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname,
                }
            }
        ]
    }
    //to change the data object into json format string//
    var Data = JSON.stringify(data);
    const appid = "7044169adb8303e8e17391db69812f03-us12";
    const options = {
        method:"POST",
        auth:"kshitiz002:"+appid
    }
    const requ = https.request(" https://us12.api.mailchimp.com/3.0/lists/9f74b28479",options,function (response){
        response.on("data",function(data){
            var dataFromAPI = JSON.parse(data);
            // switch(dataFromAPI)
            // console.log(dataFromAPI);
            if(response.statusCode = 200){
                resp.sendFile(__dirname+"/success.html");
            }
            else{
                resp.sendFile(__dirname+"/failure.html");
            }
        })
    })
    requ.write(Data);
    requ.end();
    // resp.send("<h1> Hello " + fname + " " + lname +" </h1>");
})
//Listen
app.listen(3000,function(){
    console.log("Server Listening");
})

//Audience ID
// 9f74b28479
// MailChimp api
// 7044169adb8303e8e17391db69812f03-us12