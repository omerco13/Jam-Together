const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const createRoom = async (data) => {
    const response = await fetch(`${BASE_URL}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create room');
    }

    return response.json();
};