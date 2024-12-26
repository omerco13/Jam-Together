const rooms = require('../data/rooms')

const joinRoom = (req, res) => {
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
    })
}

module.exports = { joinRoom }