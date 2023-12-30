import React, { useEffect, useState } from 'react'
import "./styles/News.css"
import NewsCard from './components/NewsCard'

function News() {

    // const [topNews, setTopNews] = useState([])

    // useEffect(() => {

    //     const getNews = async () => {
    //         const url = `https://newsapi.org/v2/everything?q=bitcoin&sortBy=popularity&pageSize=10&apiKey=e8cfb68fb54a4a8098ac4348d347498d`
    //         const res = await fetch(url)
    //         const data = await res.json()
    //         await setTopNews(data.articles)
    //     }

    //     getNews()
    // }
    //     , [])

    // console.log(topNews)

    return (
        <div className='news'>
            <div className="top-news">
                <h2>Top News</h2>
                <hr />
                {/* {topNews.map((article, i) => {

                console.log(article)
                return (
                    <NewsCard 
                    key={i} 
                    title={article.title} 
                    desc={article.description} 
                    url={article.url} 
                    image={article.urlToImage} 
                    />
                )
            })} */}
                <div className="newsContainer">
                    <NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    />
                    <NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    /><NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    /><NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    />

                </div>

            </div>

            <div className="crypto-news">
                <h2>Crypto News</h2>
                <hr />
                {/* {topNews.map((article, i) => {

                console.log(article)
                return (
                    <NewsCard 
                    key={i} 
                    title={article.title} 
                    desc={article.description} 
                    url={article.url} 
                    image={article.urlToImage} 
                    />
                )
            })} */}
                <div className="newsContainer">
                    <NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    />
                    <NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    /><NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    /><NewsCard
                        title="Fresh Bitcoin Hype Shows Crypto Just Can’t Help Itself"
                        desc="After crashes, scandals, and SBF’s guilty verdict, many hoped the crypto industry would grow up. Speculation around the arrival of a spot bitcoin ETF shows old hype dies hard."
                        url="https://www.wired.com/story/bitcoin-etf-crypto-investments/"
                        image="https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
                    />

                </div>

            </div>

        </div>
    )
}

export default News