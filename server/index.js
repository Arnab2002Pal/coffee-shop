const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cloudinary = require('cloudinary')
const router = require('./routes/router')
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

const apiProxy = createProxyMiddleware({
  target: `${process.env.HOST}:${port}`,
  changeOrigin: true,
  secure: false,
});

app.use(apiProxy)

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.use('/api/v1/',router)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
