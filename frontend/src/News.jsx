import React, { useEffect, useState } from 'react'
import "./styles/News.css"
import NewsCard from './components/NewsCard'

function News() {

    const [topNews, setTopNews] = useState([])
    const [cryptoNews, setCryptoNews] = useState([])
    const [financeNews, setFinanceNews] = useState([])

    useEffect(() => {

        const getNews = async () => {
            const url = `https://newsdata.io/api/1/news?apikey=pub_361055f5f2ed74f9ba3d033c47cba297cc48b&size=10&country=us&full_content=1&prioritydomain=top&language=en`
            const res = await fetch(url)
            const json = await res.json()
            const data = json.results
            // console.log(data)    
            // await setTopNews(data)
            await setTopNews((data.filter((s) => s.image_url && s.description)).slice(0, 4))
        }

        const getCryptoNews = async () => {
            const url = `https://newsdata.io/api/1/news?apikey=pub_361055f5f2ed74f9ba3d033c47cba297cc48b&size=10&country=us&full_content=1&prioritydomain=top&q=cryptocurrency`
            const res = await fetch(url)
            const json = await res.json()
            const data = json.results
            console.log(data)
            // await setTopNews(data)
            await setCryptoNews((data.filter((s) => s.image_url && s.description)).slice(0, 4))
        }

        const getFinanceNews = async () => {
            const url = `https://newsdata.io/api/1/news?apikey=pub_361055f5f2ed74f9ba3d033c47cba297cc48b&size=10&country=us&full_content=1&prioritydomain=top&q=finance`
            const res = await fetch(url)
            const json = await res.json()
            const data = json.results
            console.log(data)
            // await setTopNews(data)
            await setFinanceNews((data.filter((s) => s.image_url && s.description)).slice(0, 4))
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

                        console.log(article)
                        return (
                            <NewsCard
                                key={i}
                                title={article.title}
                                desc={article.description}
                                url={article.link}
                                image={article.image_url}
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
                                url={article.link}
                                image={article.image_url}
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
                                url={article.link}
                                image={article.image_url}
                            />
                        )
                    })}
                </div>



            </div>

        </div>
    )
}

export default News