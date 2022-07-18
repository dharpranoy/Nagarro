const http = require('http')
const axios = require('axios')
let apikey = 'd3123f8580636b7d2e693531d9ceb409'
let longitude = 77.209;
let latitude = 28.6139;

let city = "asansol";
let countryCode = "IN";
let stateCode = "WB";

let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},${countryCode}&units=metric&appid=${apikey}`;
http.createServer((request,response)=>{
   axios.get(URL)
  .then(response=>response.data)
  .then(data=>{
    response.write(`<html>
                       <head>
                           <title>Weather</title>
                           </head>
                            <body> 
                                <div id='container'>
                                    <h1> Place - : ${data.name}<h1>
                                    <h1> Weather type - : ${data.weather[0].main} <h1>
                                    <h1> Temprature - : ${data.main.temp} &deg;C<h1>
                                    <h1> Visibility - : ${data.visibility} meter<h1>
                                    <h1> Humidity - : ${data.main.humidity}%<h1>
                                </div>
                           </body>
                     </html>`)

        response.end()
  })
}).listen(3000)
