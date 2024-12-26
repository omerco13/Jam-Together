const express = require('express')
const router = express.Router()
const rooms = require('../data/rooms')

const { createRoom } = require('../controllers/createRoomController')
const { joinRoom } = require('../controllers/joinRoomController')
const getRoomDetails = require('../controllers/roomDetailsController')

router.post('/', createRoom)
router.post('/:id/join', (req, res) => {
    const { id } = req.params;
    const { name, instrument } = req.body

    const room = rooms.find((room) => room.id === id)

    if (!name || !instrument) {
        return res.status(400).json({ message: 'Name and instrument are required' });
    }

    room.participants.push({ name, instrument });

    res.json({
        message: `${name} successfully joined the room`,
        room,
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const room = rooms.find((room) => room.id === id)

    res.json(room)
})

router.get('/', (req, res) => {
    res.json(rooms)
})

module.exports = router
