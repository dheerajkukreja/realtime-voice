require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json({
    limit: '8mb'
}))


const DbConnect = require('./database')()
const userRoutes = require('./routes/userRoutes')
const roomRoutes = require('./routes/roomRoutes')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.static('storage'))

app.use('/storage', express.static('storage'))

const cors = require("cors")

const corsOption = {
    credentials:true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.use('/api/user', userRoutes)

app.use('/api/rooms', roomRoutes)

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)   
})