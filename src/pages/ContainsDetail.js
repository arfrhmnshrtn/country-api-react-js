import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./containsDetail.css";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

export default function ContainsDetail() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const parameter = useParams();

    useEffect(() => {
        async function getData() {
            const request = await fetch(`https://restcountries.com/v2/name/${parameter.slug}?fullText=true`);
            const response = await request.json();


            setData(response[0]);
            setLoading(false);
        }

        getData();
    }, [parameter]);

    function backButtonHandler() {
        window.history.back();
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Detail {parameter.slug}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <Navbar/>
            
            {loading ? <div className="container"><Loading/></div> :
                <div className="container-fluid h-100">
                    <button onClick={backButtonHandler} className="back-button mt-4 ms-4 btn btn-outline-secondary ps-3 pe-3">Back</button>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-5 d-flex justify-content-center">
                                <img className="shadow-lg img-fluid" src={data.flag} alt="" />
                            </div>
                            <div className="col-md-7 text-detail">
                                <div className="name fs-3 fw-bold">{data.name}</div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="native-name pt-2 pb-2 fs-6 fw-bold">
                                            Native Name :
                                            <span className="fw-normal fst-italic">{data.nativeName}</span>
                                        </div>
                                        <div className="region pt-2 pb-2 fs-6 fw-bold">Region : <span className="fw-normal fst-italic">{data.region}</span></div>
                                        <div className="subregion pt-2 pb-2 fs-6 fw-bold">SubRegion : <span className="fw-normal fst-italic">{data.subregion}</span></div>
                                        <div className="capital pt-2 pb-2 fs-6 fw-bold">Capital : <span className="fw-normal fst-italic">{data.capital}</span></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="top-level-domain pt-2 pb-2 fs-6 fw-bold">Top Level Domain : <span className="fw-normal fst-italic">{data.topLevelDomain[0]}</span></div>
                                        <div className="currencies pt-2 pb-2 fs-6 fw-bold">Curency : <span className="fw-normal fst-italic">{`${data.currencies[0].name}, ${data.currencies[0].symbol}, ${data.currencies[0].code}`}</span></div>
                                        <div className="langueages fs-6 pt-2 pb-2 fw-bold">Languages : <span className="fw-normal fst-italic">{`${data.languages[0].name}, ${data.languages[0].nativeName}`}</span></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}