import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import styles from "./Home.module.css";
import Loader from "../../Components/Loader/Loader";

function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async function newsApiCall() {
        const response = await getNews();
        setArticles(response);
        })();

        // cleanup function
        setArticles([]);
    }, []);

    const handleCardClick = (url) => {
        window.open(url, "_blank");
    };

    if (articles.length === 0) {
        return <Loader text="HomePage" />;
    }

    return (
        <>            
        <div className={styles.header}>Welcome to PerspectivePulse!</div>
        <p className={styles.headline}>Explore the latest news and discover new perspectives.</p>
        <div className={styles.grid}>
            {articles.map((article) => (
            <div
                className={styles.card}
                key={article.url}
                onClick={() => handleCardClick(article.url)}
            >
                <img src={article.urlToImage} alt="blog pic"/>
                <h3>{article.title}</h3>
            </div>
            ))}
        </div>
        </>
    );
}

export default Home;