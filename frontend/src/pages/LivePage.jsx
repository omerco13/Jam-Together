import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const LivePage = () => {
    const { roomCode } = useParams();
    const { state } = useLocation();
    const { song } = state || {};

    if (!song) {
        return (
            <div className="page-container">
              <p className="text-xl text-red-500">No song selected. Please go back and select a song.</p>
            </div>
        )
    }

    return (
        <div className="page-container">
      <div className="live-session">
        <h1 className="page-heading">Live Session</h1>
        <h2 className="song-title">{song.name}</h2>
        <h3 className="song-artist">By: {song.artist}</h3>
        <div className="song-content">
          {song.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivePage;