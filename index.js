const fs = require('fs')
const express = require('express')
const app = express()
const https = require('https')
const privateKey = fs.readFileSync( '/etc/letsencrypt/live/vanilla-sudoku.com/privkey.pem')
const certificate = fs.readFileSync( '/etc/letsencrypt/live/vanilla-sudoku.com/cert.pem' )
const port = 443

app.use(express.static('static'))
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
   res.send('Hello World')
})

app.all('*', (req, res) => {
    res.status(404).send("Not Found")
})

https.createServer({
    key: privateKey,
    cert: certificate,
}, app).listen(port)
