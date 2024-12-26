const { Server } = require('socket.io')
const rooms = require("../data/rooms")

function initializeSocket (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    })

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id)

        socket.on('joinRoom', ({ roomId, user }) => {
            const room = rooms.find((room) => room.id === roomId)
            room.participants.push({ id: socket.id, ...user })
            socket.join(roomId);

            io.to(roomId).emit('userJoined', { user, participants: room.participants })
        })

        socket.on('selectSong', ({ roomId, song }) => {
            console.log(`Song selected for room ${roomId}: ${song}`)


            io.to(roomId).emit('songSelected', { song, roomId })
        })


        socket.on('startLiveSession', ({ roomId, song }) => {
            const room = rooms.find((room) => room.id === roomId)
            if (room) {
                console.log(`Live session started in room ${roomId} with song: ${song.name}`)
                io.to(roomId).emit('startLiveSession', { song })
            }
        })

        
        socket.on('endSession', ({ roomId }) => {
            const room = rooms.find((room) => room.id === roomId)
            if (room) {
                console.log(`Live session ended in room ${roomId}`)
                io.to(roomId).emit('endSession')
            }
        })


        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id)
            rooms.forEach((room) => {
                const index = room.participants.findIndex((p) => p.id === socket.id);
                if (index !== -1) {
                    const [removedParticipant] = room.participants.splice(index, 1)
                    console.log(`Removed participant:`, removedParticipant)
        
                    io.to(room.id).emit("userLeft", { participants: room.participants })
                }
            })
        })

        


    })
}

module.exports = initializeSocket;