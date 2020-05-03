const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: 'Selena'
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: 'Selena'
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help article",
        name: 'Selena'
    })
})

app.get('/help/*', (req, res) => {
    res.render("pagenotfound", {
        title: "404",
        name: 'Selena',
        errorMessage: 'Help article not found'
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is a required field'
        });
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render("pagenotfound", {
        title: "404",
        name: 'Selena',
        errorMessage: 'page not found'
    });
})

app.listen(3000, () => { console.log('Server is up at 3000') });