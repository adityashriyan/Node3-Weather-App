// Loading built-in Modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Loading API modules
const geocode = require('./utils/geocode')
const reverseGeocode = require('./utils/reverseGeocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Express config PATHS
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Render the hbs files
app.get('', (req, res) => {
    res.render('index', {
        author: 'Aditya Shriyan',
        title: 'Weather App',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        author: 'Aditya Shriyan',
        name: 'The Amazing AdiPadi',
        title: 'About Page',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        author: 'Aditya Shriyan',
        title: 'For queries, contact:-',
        contacts: [{
            name: 'Aditya Shriyan',
            details: 'Contact No. +91-88795 99009'
        }]
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecast = '') => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    location,
                    forecast
                })
            })
        })
    } else if (req.query.latitude) {
        reverseGeocode(req.query.latitude, req.query.longitude, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecast = '') => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    location,
                    forecast
                })
            })
        })
    } else {
        return res.send({
            error: 'You must provide an address!'
        }) 
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        author: 'Aditya Shriyan',
        windowTitle: 'Article Not Found',
        title: 'No Such Article :(',
        errorMessage: 'This Help Article was not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        author: 'Aditya Shriyan',
        windowTitle: 'Uh-Oh',
        title: 'Error 404:',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})
