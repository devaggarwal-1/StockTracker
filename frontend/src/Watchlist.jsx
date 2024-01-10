import React, { useEffect, useState } from 'react'
import './styles/watchlist.css'

import StockCard from './components/StockCard'
import Cookies from 'js-cookie'
import axios from './api/axios'
import { stockQuote } from './api/FinancialModelingApi'

function Watchlist() {

    const [watchlist, setWatchlist] = useState([])
    const [watchlistData, setWatchlistData] = useState([])

    useEffect(() => {

        const getWatchlist = async () => {
            const token = Cookies.get('token')

            if (token) {
                const username = Cookies.get('username')
                const url = `/watchlist/${username}`
                try {
                    const response = await axios.get(url,
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );
                    const data = await response.data
                    const dataArr = await Promise.all(
                        data.map(async (s) => {
                            try {
                                const res = await stockQuote(s)
                                // console.log(res)
                                return res;
                            } catch (error) {
                                console.error('Error in stockQuote:', error);

                            }

                        })
                    )
                    console.log(dataArr)
                    setWatchlist(dataArr)

                } catch (error) {
                    console.log(error)
                }
            }
        }

        getWatchlist()

    }, [])

    // console.log(watchlist)

    return (
        <div className='watchlist'>
            <h1>My WatchList</h1>

            {watchlist.map((s, i) => {
                return (
                    <StockCard
                        symbol={s.symbol}
                        price={s.price}
                        change={s.change}
                        changesPercentage={s.changesPercentage}
                        key={i}
                        loggedInUser={true}
                        inWatchlist={true}
                        fromPage={"Watchlist"}
                    />
                )
            })}

        </div>
    )
}

export default Watchlist