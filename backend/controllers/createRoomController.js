const { v4: uuidv4 } = require('uuid')
const rooms = require('../data/rooms');

const createRoom = (req, res) => {
    const { admin, instrument } = req.body

    if (!admin|| !instrument) {
        return res.status(400).json({ message: "Admin name and instrument are required" })
    }


    const room = {
        id: uuidv4().slice(0, 6),
        admin,   
        participants: [
            { name: admin, instrument } 
        ]
    }

    rooms.push(room);
    res.status(201).json(room);
}


module.exports = { createRoom }