import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from './components/Navbar'
import StockCard from './components/StockCard'
import './styles/Home.css'
import { getAllGainers, getAllLosers } from './api/FinancialModelingApi'
import axios from './api/axios'


function Home() {

    const [loggedInUser, setLoggedInUser] = useState(false)
    const [watchlist, setWatchlist] = useState([])
    // const [loggedIn, setLoggedIn] = useState(false)
    const [gainers, setGainers] = useState(
        [
            {
                "symbol": "LTRY",
                "name": "Lottery.com Inc.",
                "change": 2.43,
                "price": 3.67,
                "changesPercentage": 195.9677
            },
            {
                "symbol": "SFLO",
                "name": "VictoryShares Small Cap Free Cash Flow ETF",
                "change": 25.28,
                "price": 25.28,
                "changesPercentage": 100
            },
            {
                "symbol": "SMFL",
                "name": "Smart for Life, Inc.",
                "change": 0.6363,
                "price": 1.4,
                "changesPercentage": 83.3181
            },
            {
                "symbol": "MULN",
                "name": "Mullen Automotive, Inc.",
                "change": 6.25,
                "price": 14.25,
                "changesPercentage": 78.125
            },
            {
                "symbol": "GROM",
                "name": "Grom Social Enterprises, Inc.",
                "change": 0.4622,
                "price": 1.31,
                "changesPercentage": 54.5176
            },
            {
                "symbol": "KORE",
                "name": "KORE Group Holdings, Inc.",
                "change": 0.3202,
                "price": 0.92,
                "changesPercentage": 53.3845
            },
            {
                "symbol": "HOOK",
                "name": "HOOKIPA Pharma Inc.",
                "change": 0.2975,
                "price": 0.8625,
                "changesPercentage": 52.6549
            },
            {
                "symbol": "WLGS",
                "name": "WANG & LEE GROUP, Inc.",
                "change": 0.29,
                "price": 0.85,
                "changesPercentage": 51.7857
            },
            {
                "symbol": "SBNY",
                "name": "Signature Bank",
                "change": 0.245,
                "price": 0.75,
                "changesPercentage": 48.5149
            },
            {
                "symbol": "SBNY",
                "name": "Signature Bank",
                "change": 0.245,
                "price": 0.75,
                "changesPercentage": 48.5149
            },

        ])

    const [losers, setLosers] = useState([


        { symbol: 'ALVR', name: 'AlloVir, Inc.', change: -1.5646, price: 0.7654, changesPercentage: -67.1502 },



        { symbol: 'JYD', name: 'Jayud Global Logistics Limited', change: -1.5, price: 1.28, changesPercentage: -53.9568 },


        { symbol: 'BRLI', name: 'Brilliant Acquisition Corporation', change: -3.98, price: 4.7, changesPercentage: -45.8525 },

        { symbol: 'NCPL', name: 'Netcapital Inc.', change: -0.137, price: 0.1932, changesPercentage: -41.49 },

        { symbol: 'PRZO', name: 'ParaZero Technologies Ltd.', change: -0.58, price: 1.04, changesPercentage: -35.8025 },


        { symbol: 'ADN', name: 'Advent Technologies Holdings, Inc.', change: -0.1032, price: 0.2118, changesPercentage: -32.7619 },


        { symbol: 'MULN', name: 'Mullen Automotive, Inc.', change: -4.41, price: 9.84, changesPercentage: -30.9474 },

        { symbol: 'CYCC', name: 'Cyclacel Pharmaceuticals, Inc.', change: -0.86, price: 2.74, changesPercentage: -23.8889 },

        { symbol: 'LTRY', name: 'Lottery.com Inc.', change: -0.87, price: 2.8, changesPercentage: -23.7057 },

        { symbol: 'ROI', name: 'RiskOn International, Inc.', change: -0.0492, price: 0.1588, changesPercentage: -23.6538 },



    ])


    // useEffect(() => {

    //     const getGainers = async () => {
    //         const data = await getAllGainers()
    //         setGainers(data.slice(0, 10))

    //     }
    //     const getLosers = async () => {

    //         const data = await getAllLosers()
    //         setLosers(data.slice(0, 10))

    //     }
    //     getLosers()
    //     getGainers()

    // }
    //     , [])

    useEffect(() => {

        const getWatchlist = async () => {
            const token = Cookies.get('token')

            if (token) {
                const username = Cookies.get('username')
                setLoggedInUser(true)
                const url = `/watchlist/${username}`
                try {
                    const response = await axios.get(url,
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );
                    await setWatchlist(response.data)

                } catch (error) {
                    console.log(error)
                }
            }
        }

        getWatchlist()

    }, [])



    return (
        <div className="home">
            <div className="home_container">

                {/* Top Stock Gainers Section */}
                <div className="gainers">
                    <h2>Top Gainers</h2>
                    <div className="stockTable">
                        {gainers.map((stock, i) => {
                            let inWatchlist = false
                            if (watchlist.includes(stock.symbol)) {
                                inWatchlist = true
                            } else {
                                inWatchlist = false
                            }

                            return (

                                < StockCard
                                    key={i}
                                    symbol={stock.symbol}
                                    price={stock.price}
                                    change={stock.change}
                                    changesPercentage={stock.changesPercentage}
                                    inWatchlist={inWatchlist}
                                    loggedInUser={loggedInUser}
                                    fromPage={"Home"}
                                />
                            )
                        }
                        )}

                    </div>
                </div>

                {/* Top Stock Losers Section */}
                <div className="losers">
                    <h2>Top Losers</h2>
                    <div className="stockTable">
                        {losers.map((stock, i) => {

                            let inWatchlist = false
                            if (watchlist.includes(stock.symbol)) {
                                inWatchlist = true
                            } else {
                                inWatchlist = false
                            }

                            return (

                                < StockCard
                                    key={i}
                                    symbol={stock.symbol}
                                    price={stock.price}
                                    change={stock.change}
                                    changesPercentage={stock.changesPercentage}
                                    inWatchlist={inWatchlist}
                                    loggedInUser={loggedInUser}
                                    fromPage={"Home"}
                                />
                            )
                        }
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home