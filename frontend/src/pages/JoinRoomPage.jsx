import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const JoinRoomPage = () => {
    const [name, setName] = useState('')
    const [instrument, setInstrument] = useState('')
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRooms = async () => {
            const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'
            const response = await fetch(`${BASE_URL}/api/rooms`)
            const data = await response.json();
            setRooms(data)
        }
        fetchRooms()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !instrument || !selectedRoom) {
            alert('Please fill out all fields');
            return;
        }

        const response = await fetch(`${BASE_URL}/api/rooms/${selectedRoom}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, instrument }),
        });

        const data = await response.json();
        navigate(`/user-room/${selectedRoom}`);
        
    }



    return (
        <div className="page-container">
          <h1 className="page-heading">Join a Room</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="name" className="label">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="instrument" className="label">Instrument:</label>
              <select
                id="instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="select-field"
                required
              >
                <option value="" disabled>Select an instrument</option>
                <option value="Guitar">Guitar</option>
                <option value="Piano">Piano</option>
                <option value="Drums">Drums</option>
                <option value="Violin">Violin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="room" className="label">Room:</label>
              <select
                id="room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="select-field"
                required
              >
                <option value="" disabled>Select a room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.id} (Admin: {room.admin})
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="primary-button">
              Join
            </button>
          </form>
        </div>
    );
};

export default JoinRoomPage
