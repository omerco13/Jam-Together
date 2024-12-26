import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

const socket = io(`${import.meta.env.VITE_API_URL}`)

const UsersRoomPage = () => {
  const { roomCode } = useParams()
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLive, setIsLive] = useState(false)
  const [selectedSong, setSelectedSong] = useState(null)
  const [currentSong, setCurrentSong] = useState("Waiting for the next song...")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoomDetails = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms/${roomCode}`);
    const data = await response.json();
    setRoomDetails(data);
    }

    fetchRoomDetails();

    socket.on("userLeft", ({ participants }) => {
        setRoomDetails((prevDetails) => ({
          ...prevDetails,
          participants,
        }))
      })
    
    socket.on('roomClosed', () => {
      alert('The room has been closed by the admin');
      socket.emit('leaveRoom', { roomId: roomCode });
      navigate('/');
    })

    socket.on("songSelected", ({ song }) => {
      setCurrentSong(`Current Song: ${song}`)
    });

    socket.on('startLiveSession', ({ song }) => {
      setSelectedSong(song)
      setIsLive(true)
    })

    socket.on('endSession', () => {
        setIsLive(false)
        setSelectedSong(null)
    })

    return () => {
      socket.off("userJoined")
      socket.off("userLeft")
      socket.off("songSelected")
      socket.off('startLiveSession')
      socket.off('endSession')
      socket.off('roomClosed')
    };
  }, [roomCode]);

  return (
    <div className="page-container">
      {isLive ? (
        <div className="live-session">
          <h1 className="page-heading text-white">Live Session</h1>
          <h2 className="song-title">{selectedSong?.name}</h2>
          <h3 className="song-artist">By: {selectedSong?.artist}</h3>
          <div className="song-content">
            {selectedSong?.content.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="page-heading">User Page</h1>
          <p className="text-lg">Your room code is: <strong>{roomCode}</strong></p>
          <p className="text-lg">
            {selectedSong ? `Current Song: ${selectedSong.name}` : "Waiting for the next song..."}
          </p>
          {roomDetails && (
            <div>
              <h2 className="text-xl font-bold mt-6">Participants</h2>
              <ul className="participants-list">
                {roomDetails.participants.map((participant, index) => (
                  <li key={index}>
                    {participant.name} - {participant.instrument}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <button
        className="primary-button mt-6"
        onClick={() => navigate("/")}
      >
        Leave Room
      </button>
    </div>
  );
}

export default UsersRoomPage
