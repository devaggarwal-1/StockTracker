import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthProvider'
import axios from './api/axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './styles/Auth.css'

const LOGIN_URL = '/login'

function Login() {


    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()
    const nav = useNavigate();


    //States
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])


    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
            Cookies.set('token', response.data.token, { secure: true, expires: inFifteenMinutes })
            Cookies.set('username', response.data.username, { secure: true, expires: inFifteenMinutes })

            nav('/')
            nav(0)
            setPwd('')
            setUser('')


        } catch (error) {
            if (error.response.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (error.response.status === 404) {
                setErrMsg('Incorrect Username or Password')
            } else {
                setErrMsg('Login Failed')
            }

            errRef.current.focus()
        }



    }


    return (
        <div className="authContainer">
            <section className="authSection">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                    {errMsg}
                </p>

                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username :</label>
                    <input
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required

                    />

                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        id='password'
                        autoComplete='off'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />

                    <button >Sign In</button>
                </form>

                <p>
                    Need an Account?<br />
                    <span className='line'>
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Login