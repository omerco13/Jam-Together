
const rooms = require('../data/rooms')

const roomDetailsController = (req, res) => {
    const { id } = req.params

    const room = rooms.find((room) => room.id === id)
    if (!room) {
        return res.status(404).json({ message: "Room not found" })
    }

    res.json({
        id: room.id,
        admin: room.admin,
        participants: room.participants
    })
}

module.exports = roomDetailsController