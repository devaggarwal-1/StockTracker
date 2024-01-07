import axios from "axios"

export default axios.create({
    baseURL: 'https://stock-tracker-server-nu.vercel.app'
})