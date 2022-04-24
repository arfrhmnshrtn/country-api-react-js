import { InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FilterContext } from './context/filterContext';
import Contains from './Contains';

export default function Filter(props) {
    const objData = props.data;
    const [filter, setFilter] = useState('Filter By Region');
    const [search, setSearch] = useState('');



    return (
        <Container className="mt-5">
            <Row>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search For A Country..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>

                <Col className="d-flex justify-content-end">
                    <DropdownButton id="dropdown-basic-button" title={filter}>
                        <Dropdown.Item ><Link className='text-center text-decoration-none d-block text-black' to="/">All</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFilter('Filter By : Asia') }}><Link className='text-center text-decoration-none d-block text-black' to="/asean">Asia</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFilter('Filter By : Eropa') }}><Link className='text-center text-decoration-none d-block text-black' to="/eu">Eropa</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFilter('Filter By : Africa') }}><Link className='text-center text-decoration-none d-block text-black' to="/au">Africa</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFilter('Filter By : Amerika') }}><Link className='text-center text-decoration-none d-block text-black' to="/usan">Amerika</Link></Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
        </Container>


    )
}