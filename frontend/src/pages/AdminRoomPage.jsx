
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const AdminRoomPage = () => {
    const { roomCode } = useParams()
    const [roomDetails, setRoomDetails] = useState(null)
    const [searchQuery, setSearchQuery] = useState({ name: '', artist: '' })
    const [selectedSong, setSelectedSong] = useState(null)
    const [isLive, setIsLive] = useState(true)
    const navigate = useNavigate()
    
    
    useEffect(() => {
        const fetchRoomDetails = async () => {
            const response = await fetch(`http://localhost:3000/api/rooms/${roomCode}`)
            const data = await response.json()
            setRoomDetails(data)
            
        };
        fetchRoomDetails()
        socket.emit('joinRoom', { roomId: roomCode, user: { name: 'Admin' } })

        socket.on('userJoined', ({ participants }) => {
            setRoomDetails((prevDetails) => ({
                ...prevDetails,
                participants,
            }))
        })

        socket.on("userLeft", ({ participants }) => {
            setRoomDetails((prevDetails) => ({
              ...prevDetails,
              participants,
            }))
          })

        socket.on('startLiveSession', ({ song }) => {
            setSelectedSong(song)
            setIsLive(true)
        })

        socket.on('endSession', () => {
            setIsLive(false)
            setSelectedSong(null)
        })

        return () => {
            socket.off('userJoined')
            socket.off("userLeft")
            socket.off('startLiveSession')
            socket.off('endSession')
        }
    }, [roomCode])

    const handleStartLive = (song) => {
        socket.emit('startLiveSession', { roomId: roomCode, song })
        setSelectedSong(song)
        setIsLive(true)
    }

    const handleQuitSession = () => {
        socket.emit('endSession', { roomId: roomCode })
        setIsLive(false)
        setSelectedSong(null)
    }


    const handleSearch = async () => {
        
        navigate(`/results/${roomCode}`, { state: { searchQuery } })
    }


    return (
        <div className="page-container">
      {isLive ? (
        <div className="live-session">
          <h1 className="page-heading text-white">Live Session</h1>
          {selectedSong && (
            <>
              <h2 className="song-title">{selectedSong.name}</h2>
              <h3 className="song-artist">By: {selectedSong.artist}</h3>
              <div className="song-content">
                {selectedSong.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </>
          )}
          <button
            className="danger-button mt-6"
            onClick={handleQuitSession}
          >
            Quit Session
          </button>
        </div>
        ) : (
            <div>
            <h1 className="page-heading">Admin Page</h1>
            <p className="text-lg">Your room code is: <strong>{roomCode}</strong></p>
            <div className="mt-6">
                <input
                type="text"
                placeholder="Search by name or artist"
                value={searchQuery.name || searchQuery.artist || ''}
                onChange={(e) => {
                    const value = e.target.value.trim();
                    setSearchQuery({ name: value, artist: value });
                }}
                className="input-field"
                />
                <div className="space-x-4">
                    <button
                    className="primary-button mt-4"
                    onClick={handleSearch}
                    >
                    Search
                    </button>
                    <button
                        className="primary-button mt-6"
                        onClick={() => navigate('/')}
                    >
                        Close The Room
                    </button>
                </div>
            </div>
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
        </div>
    );
    
}

export default AdminRoomPage