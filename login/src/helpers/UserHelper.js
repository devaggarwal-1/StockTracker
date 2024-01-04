import axios from '../api/axios'


export const addToWatchlist = async (username, symbol) => {
    const url = '/addWatchlist'
    const response = await axios.post(url,
        JSON.stringify({ username: username, stock: symbol }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

    return response
}

export const removeFromWatchlist = async (username, symbol) => {
    const url = '/removeWatchlist'
    const response = await axios.post(url,
        JSON.stringify({ username: username, stock: symbol }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

    return response
}

export const isInWatchlist = async (username, symbol) => {

}