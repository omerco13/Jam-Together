import {useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
      <h1 className="page-heading">Welcome to JamTogether</h1>
      <div className="space-x-4">
        <button
          className="primary-button"
          onClick={() => navigate("/create-room")}
        >
          Create Room
        </button>
        <button
          className="primary-button"
          onClick={() => navigate("/join-room")}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default HomePage