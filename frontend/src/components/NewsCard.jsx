import React from 'react'
import './NewsCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"


const variants = {
    scroll: {
        x: 5,
        opacity: 1,
        transition: {
            duration: 1.5,
            repeat: Infinity
        }
    }
}


function NewsCard({ title, desc, url, image }) {
    return (
        <motion.div className='card' whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}>
            <div className="card-body">
                <img src={image} alt="" className='card-img' />
                <h4 className="card-title">{title}</h4>
                <p className="card-desc">{desc.slice(0, 200)}...</p>
            </div>
            <a href={url} className='card-link' target='blank'>
                Read Full Article
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className='arrowIcon'
                >
                </FontAwesomeIcon>
            </a>
        </motion.div>
    )
}

export default NewsCard