import React, { useEffect, useState } from 'react'
import "./styles/News.css"
import NewsCard from './components/NewsCard'

function News() {

    const [topNews, setTopNews] = useState([])
    const [cryptoNews, setCryptoNews] = useState([])
    const [financeNews, setFinanceNews] = useState([])

    useEffect(() => {

        const getNews = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
            const res = await fetch(url)
            const data = await res.json()
            await setTopNews((data.articles.filter((s) => s.urlToImage && s.description)).slice(0, 4))
        }

        const getCryptoNews = async () => {
            const url = `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=popularity&pageSize=10&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
            const res = await fetch(url)
            const data = await res.json()
            await setCryptoNews((data.articles.filter((s) => s.urlToImage && s.description)).slice(0, 4))
        }

        const getFinanceNews = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            await setFinanceNews((data.articles.filter((s) => s.urlToImage && s.description)).slice(0, 4))
        }

        getNews()
        getCryptoNews()
        getFinanceNews()
    }
        , [])



    return (
        <div className='news'>

            <div className="top-news">
                <h2>Top News</h2>
                <hr />
                <div className="newsContainer">
                    {topNews.map((article, i) => {

                        // console.log(article)
                        return (
                            <NewsCard
                                key={i}
                                title={article.title}
                                desc={article.description}
                                url={article.url}
                                image={article.urlToImage}
                            />
                        )
                    })}

                </div>



            </div>

            <div className="finance-news">
                <h2>Finance News</h2>
                <hr />
                <div className="newsContainer">
                    {financeNews.map((article, i) => {

                        // console.log(article)
                        return (
                            <NewsCard
                                key={i}
                                title={article.title}
                                desc={article.description}
                                url={article.url}
                                image={article.urlToImage}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="crypto-news">
                <h2>Crypto News</h2>
                <hr />
                <div className="newsContainer">
                    {cryptoNews.map((article, i) => {


                        return (
                            <NewsCard
                                key={i}
                                title={article.title}
                                desc={article.description}
                                url={article.url}
                                image={article.urlToImage}
                            />
                        )
                    })}
                </div>



            </div>

        </div>
    )
}

export default News