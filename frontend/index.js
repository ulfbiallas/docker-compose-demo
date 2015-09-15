
var express = require('express')
var bodyParser = require('body-parser')
var querystring = require('querystring')
var mustache = require('mustache')
var http = require('http')
var rsvp = require('rsvp')
var fs = require('fs')

var url = 'http://localhost:8080/'

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var server = app.listen(80, function () {
  console.log('app listening on port %s.', server.address().port)
})

openTemplate('entries.tmpl').then(function(template) {
  app.get('/', function (req, res) {
    askForEntries(url).then(function(entries) {
      var data = {
        "entries": JSON.parse(entries)
      }
      var output = mustache.render(template, data)
      res.send(output)
    })
  })
})

app.post('/save', function (req, res) {
  var message = req.body.message
  saveEntry(message)
  res.redirect('/')
})



function openTemplate(filename) {
  var promise = new rsvp.Promise(function(resolve) {
    fs.readFile(filename, function (err, data) {
      if (err) {
       throw err
      }
      resolve(data.toString())
    })
  })
  return promise
}



function askForEntries(url) {
  var promise = new rsvp.Promise(function(resolve) {
    http.get(url, function(response) {
      response.on("data", function (data) {
        resolve(data.toString())
      })
    })
  })
  return promise
}



function saveEntry(entry) {
  var postData = JSON.stringify({
    "message" : entry
  })
  var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  var req = http.request(options, function(res) {
    res.setEncoding('utf8')
  })
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message)
  })
  req.write(postData)
  req.end()
}