import React, { useEffect, useState } from 'react'
import './styles/stockpage.css'
import TradingViewWidget from "./components/TradingViewWidget.jsx"
import { useParams } from 'react-router-dom'
import { stockQuote, getCompanyProfile } from './api/FinancialModelingApi.js'
import Cookies from 'js-cookie'
import axios from './api/axios'
import { addToWatchlist, removeFromWatchlist } from './helpers/UserHelper.js'

function StockPage() {
    const { s } = useParams()
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState('')
    const [stock, setStock] = useState(
        {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            price: 252.54,
            changesPercentage: -0.7701,
            change: -1.96,
            avgVolume: 121007580,
            dayHigh: 258.22,
            dayLow: 251.385,
            earningsAnnouncement: "2024-01-23T10:59:00.000+0000",
            eps: 3.1,
            exchange: "NASDAQ",
            marketCap: 802804456800,
            open: 256.76,
            pe: 81.46,
            previousClose: 254.5,
            priceAvg50: 232.6796,
            priceAvg200: 227.30965,
            sharesOutstanding: 3178920000,
            timestamp: 1703278800,
            volume: 92970913,
            yearHigh: 299.29,
            yearLow: 101.81
        })
    const [companyProfile, setCompanyProfile] = useState({
        symbol: 'TSLA',
        price: 252.54,
        beta: 2.262,
        mktCap: 802804456800,
        address: "1 Tesla Road",

        ceo
            :
            "Mr. Elon R. Musk",
        changes
            :
            -1.96,
        cik
            :
            "0001318605",
        city
            :
            "Austin",
        companyName
            :
            "Tesla, Inc.",
        country
            :
            "US",
        currency
            :
            "USD",
        cusip
            :
            "88160R101",
        dcf
            :
            181.632,
        dcfDiff
            :
            3.73173,
        defaultImage
            :
            false,
        description
            :
            "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. It operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits; and non-warranty after-sales vehicle, used vehicles, retail merchandise, and vehicle insurance services. This segment also provides sedans and sport utility vehicles through direct and used vehicle sales, a network of Tesla Superchargers, and in-app upgrades; purchase financing and leasing services; services for electric vehicles through its company-owned service locations and Tesla mobile service technicians; and vehicle limited warranties and extended service plans. The Energy Generation and Storage segment engages in the design, manufacture, installation, sale, and leasing of solar energy generation and energy storage products, and related services to residential, commercial, and industrial customers and utilities through its website, stores, and galleries, as well as through a network of channel partners; and provision of service and repairs to its energy product customers, including under warranty, as well as various financing options to its solar customers. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.",
        exchange
            :
            "NASDAQ Global Select",
        exchangeShortName
            :
            "NASDAQ",
        fullTimeEmployees
            :
            "127855",
        image
            :
            "https://financialmodelingprep.com/image-stock/TSLA.png",
        industry
            :
            "Auto Manufacturers",
        ipoDate
            :
            "2010-06-29",
        isActivelyTrading
            :
            true,
        isAdr
            :
            false,
        isEtf
            :
            false,
        isFund
            :
            false,
        isin
            :
            "US88160R1014",
        lastDiv
            :
            0,

        phone
            :
            "512 516 8177",
        range
            :
            "101.81-299.29",
        sector
            :
            "Consumer Cyclical",
        state
            :
            "TX",
        volAvg
            :
            121007580,
        website
            :
            "https://www.tesla.com",
        zip
            :
            "78725",
    })

    useEffect(() => {


        const searchStockQuote = async () => {
            const data = await stockQuote(s);
            await setStock(data);
            // console.log(data)
        }


        const searchCompanyProfile = async () => {
            const data = await getCompanyProfile(s)
            await setCompanyProfile(data)
        }

        const checkWatchlist = async () => {
            const token = Cookies.get('token')

            if (token) {
                const username = Cookies.get('username')
                setLoggedInUser(username)
                const url = `/watchlist/${username}`
                try {
                    const response = await axios.get(url,
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );

                    if (response.data.includes(s)) {
                        setIsInWatchlist(true)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }

        searchStockQuote()
        searchCompanyProfile()
        checkWatchlist()

    }, [])



    const handleAddToWatchlist = () => {

        if (loggedInUser) {
            try {
                const res = addToWatchlist(loggedInUser, s)
                console.log(res)
                setIsInWatchlist(true)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Login")
        }
    }

    const handleRemoveFromWatchlist = () => {

        try {
            const res = removeFromWatchlist(loggedInUser, s)
            console.log(res)
            setIsInWatchlist(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='stock-page'>

            <div className="container">
                <div className="heading">

                    <div className="stock-name-container">
                        <img src={companyProfile.image} alt="" className='stock-image' />
                        <div className="stock-name">
                            <h3>{stock.name}</h3>
                            <p>{stock.symbol}</p>
                        </div>
                    </div>
                    {isInWatchlist ?
                        <button onClick={handleRemoveFromWatchlist} >Remove from WatchList</button>
                        :
                        <button onClick={handleAddToWatchlist} >Add to WatchList</button>
                    }

                </div>
                <hr />

                <div className="stock-info">

                    <div className="price-chart-container">

                        <div className="priceContainer">
                            <h2 className='stock-price'>${stock.price}</h2>
                            <p className="change-percentage">{parseFloat(stock.changesPercentage).toFixed(2)}%</p>
                            <p className="price-change">{stock.change} Today</p>
                        </div>

                        <div className="stock-chart">
                            <TradingViewWidget stockSymbol={stock.symbol} />
                        </div>

                    </div>

                    <div className="about-company">
                        <h2>About</h2>
                        <hr />
                        <p className='stock-desc'>{companyProfile.description}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StockPage