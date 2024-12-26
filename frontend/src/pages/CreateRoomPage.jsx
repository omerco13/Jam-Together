import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const CreateRoomPage = () => {
    const [name, setName] = useState('')
    const [instrument, setInstrument] = useState('')
    const navigate = useNavigate();
    


    const handleClick = async () => {

        if (!name || !instrument) {
            alert('Please enter your name and select an instrument.');
            return;
        }

        const BASE_URL = import.meta.env.VITE_API_URL
        const response = await fetch(`${BASE_URL}/api/rooms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ admin: name, instrument }),
        })
        const data = await response.json();
        const roomCode = data.id;
        navigate(`/admin-room/${roomCode}`)
        
    }


    return (
        <div className="page-container">
          <h1 className="page-heading">Create a Room</h1>
          <div className="form-container">
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
            <button onClick={handleClick} className="primary-button">
              Create Room
            </button>
          </div>
        </div>
    );
};

export default CreateRoomPage
