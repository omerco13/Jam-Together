const express = require('express')
const router = express.Router()
const rooms = require('../data/rooms')

const { createRoom } = require('../controllers/createRoomController')
const { joinRoom } = require('../controllers/joinRoomController')
const getRoomDetails = require('../controllers/roomDetailsController')

router.post('/', createRoom)
router.post('/:id/join',joinRoom);

router.post('/api/rooms/:roomId/close', async (req, res) => {
      const { roomId } = req.params;
      
      await Room.findByIdAndDelete(roomId)
      io.in(roomId).emit('roomClosed')
      
      const roomSockets = await io.in(roomId).allSockets();
    roomSockets.forEach(socketId => {
      const socket = io.sockets.sockets.get(socketId);
      if (socket) {
        socket.leave(roomId);
      }
      });
      
      res.status(200).json({ message: 'Room closed successfully' });
    
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
