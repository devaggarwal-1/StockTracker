import React from 'react'
import './navbar.css'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { stockQuote } from '../api/FinancialModelingApi'

function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [stockSearch, setStockSearch] = useState('')

    const nav = useNavigate();


    useEffect(() => {
        const token = (Cookies.get('token'))



        if (token) {
            setLoggedIn(true)

        } else {
            setLoggedIn(false)
        }
    }
        , [Cookies])


    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('username')
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const stock = await stockQuote(stockSearch)
            if (stock) {
                nav(`/stock/${stock.symbol}`)
                nav(0)
            } else {
                alert("No found")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {loggedIn ? (
                <div className="navbar">
                    <div className="navbar-container">
                        <ul className="nav-links">
                            <li className='logo'><Link to='/' >StockTracker</Link ></li >
                            <li className='animate'><Link to='/'>Home</Link></li>
                            <li className='animate'><Link to='/watchlist'>WatchList</Link></li>
                            <li className='animate'><a href="#">Services</a></li>
                            <li className='animate'><a href='' onClick={handleLogout}>Logout</a></li>
                        </ul >
                        <form className='searchContainer' onSubmit={handleSearch}>

                            <input type="text" placeholder='Search By Ticker Symbol...' id='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                            <button type='submit'>Search</button>
                        </form>
                    </div>
                </div >
            )
                :
                (
                    <div className="navbar">
                        <div className="navbar-container">
                            <ul className="nav-links">
                                <li className='logo'><Link to='/' ><h2>StockTracker</h2></Link ></li >
                                <li className="animate"><Link to='/'>Home</Link></li>
                                <li className="animate"><Link to='/news'>News</Link></li>
                                <li className='animate'><Link to='/register'>Register</Link></li>
                                <li className="animate"><Link to='/login'>Sign In</Link></li>
                            </ul >
                            <form className='searchContainer' onSubmit={handleSearch}>

                                <input type="text" placeholder='Search By Ticker Symbol...' id='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                                <button type='submit'>Search</button>
                            </form>
                        </div>
                    </div >
                )


            }

        </>
    )
}

export default Navbar