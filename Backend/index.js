const express = require('express')
const connectToMongo=require("./db");
connectToMongo();
const app = express()
const port = 8000

//middleware
app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Abdul!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})