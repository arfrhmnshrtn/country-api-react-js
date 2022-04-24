import Card from "react-bootstrap/Card";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";
import "../App.css";
import Loading from "./Loading";
import "../App.css";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

export default function Contains() {
  const [lambang, setLambang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Filter By Region : All");
  const [notFound, setNotFound] = useState(false);

  useEffect(function () {
    async function getData() {
      const request = await fetch("https://restcountries.com/v2/all");
      const response = await request.json();

      setNotFound(false);
      setLambang(response);
      setLoading(false);

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

      
    }
    getData();
  }, []);

  async function filterByName(search) {
    if (search === "") {
      return;
    }
    const request = await fetch(`https://restcountries.com/v2/name/${search}`);

    if (request.status === 404) {
      setLambang([]);
      setNotFound(true);
      return;
    }
    const response = await request.json();

    await setLambang(response);
    setNotFound(false);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Whare In The World</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <InputGroup className="mb-3 shadow">
              <FormControl
                placeholder="Search For A Country..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="search-input"
                onChange={(e) => filterByName(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle
                className="shadow"
                variant="outline-secondary"
                id="dropdown-basic"
              >
                {filter}
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
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Filter By : Asia");
                  }}
                >
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/asean"
                  >
                    Asia
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Filter By : Eropa");
                  }}
                >
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/eu"
                  >
                    Eropa
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Filter By : Africa");
                  }}
                >
                  <Link
                    className="text-center text-decoration-none d-block text-black"
                    to="/au"
                  >
                    Africa
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Filter By : Amerika");
                  }}
                >
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
            {notFound ? (
              <NotFound />
            ) : (
              lambang.map((element) => {
                return (
                  <Col lg={3} md={6} key={element.name}>
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
              })
            )}
          </Row>
        </Container>
      )}
    </>
  );
}
