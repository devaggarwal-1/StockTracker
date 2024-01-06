import React, { useState, useEffect } from 'react'
import './stockCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Cookies from 'js-cookie'
import { addToWatchlist, removeFromWatchlist } from '../helpers/UserHelper'

function StockCard({ symbol, price, change, changesPercentage, inWatchlist, loggedInUser, fromPage }) {

    //states and hooks
    const nav = useNavigate()
    const [isInWatchlist, setIsInWatchlist] = useState(inWatchlist);
    const [hidden, setHidden] = useState(false)


    const changePositive = changesPercentage > 0
    changesPercentage = parseFloat(changesPercentage).toFixed(2)
    change = parseFloat(change).toFixed(2)
    console.log(change)

    //when the page loads
    useEffect(() => {
        setIsInWatchlist(inWatchlist);
    }, [inWatchlist]);


    //handle click for stock card
    const handleClick = () => {
        nav(`/stock/${symbol}`)
        nav(0)
    }

    //handlle button click for add to watchlist btn
    const handleAddToWatchlist = async (e) => {
        e.stopPropagation()

        //add or removes stock only if a valid user has logged in
        if (loggedInUser) {
            console.log("Logged in")

            //if the stock isn't in watchlist , add it to watchlist
            if (!isInWatchlist) {

                //add to watchlist
                console.log("add")
                try {
                    const newInWatchlist = !isInWatchlist;
                    setIsInWatchlist(newInWatchlist);
                    const username = Cookies.get('username')
                    const res = addToWatchlist(username, symbol)

                } catch (error) {
                    console.log(error)
                }

                //Remove from watchlist
            } else {
                console.log("remove")
                try {
                    if (fromPage == 'Watchlist') {
                        setHidden(true)
                    }
                    const newInWatchlist = !isInWatchlist;
                    setIsInWatchlist(newInWatchlist);
                    const username = Cookies.get('username')

                    const res = removeFromWatchlist(username, symbol)

                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            }

        } else {
            alert("Please create an account")
        }
    }


    // HTML for Stock Card
    return (
        <div className={hidden ? "stock-card hidden" : "stock-card"}>
            <div className="stock-card-container" onClick={handleClick}>
                <h3 className='stock-name'>{symbol}</h3>
                <p className="stock-price">${parseFloat(price).toFixed(2)}</p>
                <div className={changePositive ? "price-change positive" : "price-change negative"} >
                    <FontAwesomeIcon icon={changePositive ? faCircleArrowUp : faCircleArrowDown}></FontAwesomeIcon>
                    <p className='stock-price-change'>${change}</p>
                    <p className='stock-price-change-percent'>({changesPercentage}%)</p>
                </div>

                {/* rendering component differently if the stock is in the users watchlist */}
                {isInWatchlist ? (
                    <FontAwesomeIcon icon={faSquareMinus} className="addToWatchlist-btn" title='Remove from watchlist' onClick={handleAddToWatchlist}></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon icon={faSquarePlus} className="addToWatchlist-btn" title='Add to watchlist' onClick={handleAddToWatchlist}></FontAwesomeIcon>
                )}

            </div>
            <hr />
        </div>
    )
}

export default StockCard
