import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ResultPage = () => {
    const { roomCode } = useParams()
    const { state } = useLocation()
    const { searchQuery } = state || {}
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSongs = async () => {
            
            const query = new URLSearchParams(searchQuery).toString();
            const response = await fetch(`https://jam-together-backend.onrender.com/api/songs?${query}`)
            const data = await response.json()
            setSearchResults(data)
            
        }
        if (searchQuery) {
            fetchSongs()
        }
    }, [searchQuery])

    const handleSelectSong = (song) => {
        navigate(`/admin-room/${roomCode}`, { state: { song, isLive: true } });
    }

    return (
        <div className="page-container">
            <h1 className="page-heading">Search Results</h1>
            {searchResults.length > 0 ? (
                <ul className="search-results">
                {searchResults.map((song, index) => (
                    <li
                    key={index}
                    className="result-item"
                    onClick={() => handleSelectSong(song)}
                    >
                    <strong>{song.name}</strong> by {song.artist}
                    </li>
                ))}
                </ul>
            ) : (
                <p className="empty-state">No songs found</p>
            )}
            <button
                className="primary-button mt-6"
                onClick={() => navigate(`/admin-room/${roomCode}`)}
            >
                Return to Admin Page
            </button>
        </div>
    );
}

export default ResultPage
