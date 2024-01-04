import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faL } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "./api/axios";
import { Link } from "react-router-dom";
import './styles/Auth.css'


const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'


const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])


    useEffect(() => {
        const result = PWD_REGEX.test(pwd)

        setValidPwd(result)
        const match = pwd == matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            setSuccess(true)

        } catch (error) {
            if (error.response.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }




    }

    return (
        <>

            {success ? (
                <div className="authContainer">
                    <section className="authSection">
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login">Sign In</Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div className="authContainer">
                    <section className="authSection">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <div className="title">
                            <h1>Sign Up</h1>
                            <p>
                                Already Registered?&nbsp;
                                <span className="line">
                                    <Link to="/login">Sign In</Link>
                                </span>
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className="input_container">
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : " true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    placeholder="Username"
                                />
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !user ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </div>

                            <p id="uidnote" className={userFocus && user && !validName ?
                                "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters,numbers,underscores,hyphens allowed.
                            </p>

                            {/* Password */}

                            <div className="input_container">
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    placeholder="Password"
                                />
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </div>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />

                            </p>

                            {/* passwordMatch */}

                            <div className="input_container">
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    placeholder="Confirm Password"

                                />
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </div>
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>


                            <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                                Sign Up
                            </button>

                        </form>

                    </section>
                </div>

            )
            }

        </>
    )
}

export default Register