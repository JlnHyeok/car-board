const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const path = require('path')
app.use(express.static(path.join(__dirname,"app/client/build")))
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'app/client/build','index.html'))
})


app.listen(PORT , ()=>{
  console.log(`Connected! : ${PORT}`)
})
