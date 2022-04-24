import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Loading from "./Loading";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "../App.css";
import Navbar from "./Navbar";

export default function FilterByRegion() {
  const [region, setRegion] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const request = await fetch(
        `https://restcountries.com/v2/regionalbloc/${params.slug}`
      );
      const response = await request.json();

      setRegion(response);
      setLoading(false);
    }

    getData();
  }, [params]);

  async function filterByName(search) {
    if (search === "") {
      return;
    }
    const request = await fetch(`https://restcountries.com/v2/name/${search}`);

    if (request.status === 404) {
      setRegion([]);
      return;
    }
    const response = await request.json();

    const searhInput = document.querySelector(".search-input");
    const body = document.querySelector("body");
    const card = document.querySelectorAll(".wrapper-card");

    if (body.classList.contains("dark-mode")) {
      searhInput.classList.add("dark-mode");
      card.forEach((card) => {
        card.classList.add("dark-mode");
      });
    } else {
      searhInput.classList.remove("dark-mode");
      card.forEach((card) => {
        card.classList.remove("dark-mode");
      });
    }

    return setRegion(response);
  }

  let titleContinent = "";
  region.forEach((element) => {
    titleContinent = element.region;
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Filter Region By {titleContinent}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search For A Country..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => filterByName(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                {`Filter By : ${titleContinent}`}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/"
                  >
                    All
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/asean"
                  >
                    Asia
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/eu"
                  >
                    Eropa
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/au"
                  >
                    Africa
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/usan"
                  >
                    Amerika
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      {loading ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <Container className="mt-3">
          <Row>
            {region.map((element) => {
              return (
                <Col md={3} key={element.name}>
                  <Link
                    to={`/detail/${element.name}`}
                    className="text-decoration-none text-black"
                  >
                    <Card className="wrapper-card shadow mb-3 mt-3">
                      <Card.Img
                        className="img-card shadow"
                        variant="top"
                        src={element.flags.svg}
                      />
                      <Card.Body>
                        <Card.Title className="mb-3 fs-4 fw-bold">
                          {element.name}
                        </Card.Title>
                        <p>
                          <span className="fw-bold">Population :</span>{" "}
                          <i>{element.population}</i>
                        </p>
                        <p>
                          <span className="fw-bold">Region :</span>{" "}
                          <i>{element.region}</i>
                        </p>
                        <p>
                          <span className="fw-bold">Capital :</span>{" "}
                          <i>{element.capital}</i>
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
}
