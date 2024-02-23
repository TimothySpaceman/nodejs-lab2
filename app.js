const express = require("express");
const hbs = require("hbs");
const port = 3000;
const api_key = "cb61bfc988394acf96894705242302";

let app = express();

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

app.get("/home", (req, res) => {
    res.render("home.hbs")
});


app.get("/weather/:city?", async (req, res) => {
    const cityName = req.params.city || req.query.city || req.headers['x-forwarded-for'] || req.socket.remoteAddress ;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityName}`)
        .then(
            response=>response.json()
        ).then(
            weather => res.render("weather.hbs", {weather})
        )
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});