require('dotenv').config()

const express = require('express')
const http = require('http')
const initializeSocket = require('./utils/socket')
const songRoutes = require('./routes/songRoutes')
const roomRoutes = require('./routes/roomRoutes')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
const server = http.createServer(app)

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))
app.options('*', cors())

initializeSocket(server)

app.use(express.json())
app.use('/api/songs', songRoutes)
app.use('/api/rooms', roomRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})