export const stockQuote = async (stockTicker) => {
    const url = `https://financialmodelingprep.com/api/v3/quote/${stockTicker}?apikey=${import.meta.env.VITE_API_KEY}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data[0]
}

export const getAllGainers = async () => {
    const gainersUrl = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${import.meta.env.VITE_API_KEY}`

    const res = await fetch(gainersUrl)
    const data = await res.json()
    return data
}

export const getAllLosers = async () => {
    const losersUrl = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${import.meta.env.VITE_API_KEY}`

    const res = await fetch(losersUrl)
    const data = await res.json()
    return data
}

export const getCompanyProfile = async (stockTicker) => {
    const url = `https://financialmodelingprep.com/api/v3/profile/${stockTicker}?apikey=${import.meta.env.VITE_API_KEY}`

    const res = await fetch(url)
    const data = await res.json()
    return data[0]
}