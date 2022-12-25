const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
   
 res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res){
const key = "7ba2905bcb252530a7f600fe4152bd87";
const query = req.body.location;
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=metric";
    https.get(url, function(response){

             console.log(response.statusCode);

                 response.on("data", function(data){
                    // console.log(data);
                    var weather = JSON.parse(data);
                    var temp = weather.main.temp;
                    var description = weather.weather[0].main;
                    var icon = weather.weather[0].icon;
                    var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                    res.write("<p> The weather is " + description + " </p>");
                    res.write("<h1> The temperature in " + query + " is " + temp +" Degree Celsius </h1>");
                    res.write("<img src=" + imgUrl +">");
                    res.send();
                     
                })
        });

});

app.listen(3000, function(){
    console.log("Server started at port 3000");
})

