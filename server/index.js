const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes/router')
const cloudinary = require('cloudinary')
dotenv.config()

const db = require('./utils/db')

const app = express()
const port = process.env.PORT || 3000

app.use(cors());

app.use(express.json({
    limit: "50mb"
}))
app.use(express.urlencoded({
    extended: true,
    limit:"50mb"
}))
db()

cloudinary.v2.config({ 
    cloud_name: "dl8mvnwxh", 
    api_key: "321928371763247", 
    api_secret:"o_Gyb1ju40BgPgTlJGELmYL-iuc" 
});

app.use('/api/v1/',router)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
