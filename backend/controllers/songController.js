const path = require('path')
const fs = require('fs')


const getSongs = (req, res) => {
    try {
        const songs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/songs.json'), 'utf8'))
        const { name, artist } = req.query

        const filteredSongs = filterSongs(songs, name, artist)

        if (filteredSongs.length > 0) {
            res.json(filteredSongs.map((song) => ({
                artist: song.singer,
                name: song.name,
                content: song.content,
            })))
        } else {
            res.status(404).json({ message: 'No songs found matching your query' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading songs data', error })
    }
}



function filterSongs(songs, name, artist) {

    const query = name || artist
    if (!query) return songs

    return songs.filter((song) =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.singer.toLowerCase().includes(query.toLowerCase())
    )
}



module.exports = { getSongs }