const express = require('express')
const connectToMongo=require("./db");
// const cors=require('cors')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 8000
app.use(cors())
//middleware
app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Abdul!')
})

app.listen(port, () => {
  console.log(`iNoteBookApp Listneing on port ${port}`)
})