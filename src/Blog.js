import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function Blog() {

    const [articles, setarticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        document.title = 'Blog';
        async function getAtricle() {
            const request = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
            const response = await request.json();

            setarticles(response);
            setLoading(false);
        }
        getAtricle();
    }, []);

    return (
        <>
            <h3 className="mb-4 mt-5 text-center"><i>Selamat Datang Di Halaman Blog Arieff!!!</i></h3>
            {loading ? <p className="text-center fs-4"><i>Loading Page ...</i></p> :
                <div className="container text-center">
                    <div className="row">
                        {articles.map(article => {
                            return <div className="col-md-6 col-lg-4" key={article.id}>
                                <div className="card mb-5" style={{ height: "23rem" }}>
                                    <img src={article.imageUrl} style={{ height: "10rem", objectFit: "cover" }} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title" >{article.title}</h5>
                                        <p><i>{article.publishedAt}</i></p>
                                        <Link className="text-white text-decoration-none" to={`/detail/${article.id}`}><button type="button" className="btn btn-success">Detail</button></Link>

                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>


            }

        </>
    )
}