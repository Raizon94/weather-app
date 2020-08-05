const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
      res.render('index', {
        title: 'Weather App',
        name: 'William'
      })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About',
      name: 'William'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      name: 'William'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
      res.send('Type a location')
    } else {
      geocode(req.query.address, (error, position) => {
        if(error) {
          res.send(error)
        } else {
          forecast(position.latitude, position.longitude, (error, forecast) => {
            if(error) {
              res.send(error)
            } else {
              res.send({location: req.query.address, temp: forecast.temp, humidity: forecast.humidity})
            }
          })
        }
      })
    }
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 error',
    not_founded: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 error',
    not_founded: 'Page not found'
  })
})

app.listen(3000, () => {
      console.log('Server is up on port 3000')
})
