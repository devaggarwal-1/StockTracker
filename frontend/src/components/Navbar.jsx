import React from 'react'
import './navbar.css'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { stockQuote } from '../api/FinancialModelingApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [stockSearch, setStockSearch] = useState('')
    const [toggleClicked, setToggleClicked] = useState(false)

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
        nav('/')
        nav(0)
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

    const handleToggleButton = () => {
        setToggleClicked(!toggleClicked)
    }

    const handleDropDownClick = () => {
        setToggleClicked(false)
    }

    return (
        <>
            {loggedIn ? (
                <>
                    <div className="navbar">
                        <div className="navbar-container">
                            <Link to='/' className='logo'><h2>StockTracker</h2></Link >
                            <ul className="nav-links">

                                <li className='animate'><Link to='/'>Home</Link></li>
                                <li className='animate'><Link to='/watchlist'>WatchList</Link></li>
                                <li className="animate"><Link to='/news'>News</Link></li>
                                <li className='animate'><a href='' onClick={handleLogout}>Logout</a></li>
                            </ul >
                            <form className='searchContainer' onSubmit={handleSearch}>

                                <input type="text" placeholder='Search By Ticker Symbol...' id='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                                <button type='submit'>Search</button>
                            </form>
                            <div className="toggle_btn">
                                <FontAwesomeIcon icon={toggleClicked ? faTimes : faBars} className='toggle_icon' onClick={handleToggleButton}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div >
                    <div className={toggleClicked ? "dropdown_menu open" : "dropdown_menu close"}  >
                        <form className='searchContainer' onSubmit={handleSearch}>

                            <input type="text" placeholder='Search By Ticker Symbol...' className='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                            <button type='submit'>Search</button>
                        </form>
                        <li className="animate"><Link to='/'>Home</Link></li>
                        <li className="animate"><Link to='/news'>News</Link></li>
                        <li className='animate'><Link to='/watchlist'>WatchList</Link></li>
                        <li className='animate'><a href='' onClick={handleLogout}>Logout</a></li>

                    </div>
                </>

            )
                :
                (
                    <>
                        <div className="navbar">
                            <div className="navbar-container">
                                <Link to='/' className='logo'><h2>StockTracker</h2></Link >
                                <ul className="nav-links">

                                    <li className="animate"><Link to='/'>Home</Link></li>
                                    <li className="animate"><Link to='/news'>News</Link></li>
                                    <li className='animate'><Link to='/register'>Register</Link></li>
                                    <li className="animate"><Link to='/login'>Sign In</Link></li>
                                </ul >
                                <form className='searchContainer' onSubmit={handleSearch}>

                                    <input type="text" placeholder='Search By Ticker Symbol...' className='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                                    <button type='submit'>Search</button>
                                </form>
                                <div className="toggle_btn">
                                    <FontAwesomeIcon icon={toggleClicked ? faTimes : faBars} className='toggle_icon' onClick={handleToggleButton}></FontAwesomeIcon>
                                </div>
                            </div>
                        </div >
                        <div className={toggleClicked ? "dropdown_menu open" : "dropdown_menu close"}  >
                            <form className='searchContainer' onSubmit={handleSearch}>

                                <input type="text" placeholder='Search By Ticker Symbol...' id='searchTicker' onChange={(e) => setStockSearch(e.target.value)} />
                                <button type='submit'>Search</button>
                            </form>
                            <li className="animate"><Link to='/' onClick={handleDropDownClick}>Home</Link></li>
                            <li className="animate"><Link to='/news' onClick={handleDropDownClick}>News</Link></li>
                            <li className='animate'><Link to='/register' onClick={handleDropDownClick}>Register</Link></li>
                            <li className="animate"><Link to='/login' onClick={handleDropDownClick}>Sign In</Link></li>

                        </div>
                    </>
                )


            }

        </>
    )
}

export default Navbar