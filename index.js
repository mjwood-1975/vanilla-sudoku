const express = require('express')
const app = express()

app.use(express.static('static'))
app.use('/static', express.static('static'))

app.get('/', function (req, res) {
	  res.send('Hello World')
})

app.listen(80)
