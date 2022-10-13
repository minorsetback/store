import React, { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

const MainPage = () => {

    const [sort, setSort] = useState({
        sortBy: '', category: {
            "men's clothing": false,
            'jewelery': false,
            'electronics': false,
            "women's clothing": false
        }
    })

    const [products, setProducts] = useState()

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get("https://fakestoreapi.com/products")
            setProducts(res.data)
        }
        getProducts()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar bg="light" className="justify-content-between">
                <div style={{ margin: "0 0 0 15px" }}>
                    <Navbar.Brand href="/order">Order Page</Navbar.Brand>
                </div>
                <div className="mr-3">
                    <Navbar.Brand href="/cart">Cart</Navbar.Brand>
                </div>
            </Navbar>
            <div className="d-flex justify-content-between m-3">
                <Dropdown className="sort">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSort({ sortBy: 'name', category: sort.category }) }}>By name</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort({ sortBy: 'price', category: sort.category }) }}>By price</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            className={`${sort.category["men's clothing"] ? "bg-success" : ""}`}
                            onClick={() => { setSort({ sortBy: sort.sortBy, category: { ...sort.category, "men's clothing": !sort.category["men's clothing"] } }) }}>
                            Men
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`${sort.category.jewelery ? "bg-success" : ""}`}
                            onClick={() => { setSort({ sortBy: sort.sortBy, category: { ...sort.category, "jewelery": !sort.category.jewelery } }) }}>
                            jewelery
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`${sort.category.electronics ? "bg-success" : ""}`}
                            onClick={() => { setSort({ sortBy: sort.sortBy, category: { ...sort.category, "electronics": !sort.category.electronics } }) }}>
                            electronics
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`${sort.category["women's clothing"] ? "bg-success" : ""}`}
                            onClick={() => { setSort({ sortBy: sort.sortBy, category: { ...sort.category, "women's clothing": !sort.category["women's clothing"] } }) }}>
                            women
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Container>
                <Row>
                    {products &&
                        products.length && products?.map((item, index) => {
                            return (
                                <Col xs key={index}>
                                    <Card style={{ width: '18rem', height: '40rem' }} className='mt-4 mx-auto'>
                                        <Card.Img variant="top" style={{ width: '100%', height: '15rem' }} src={item?.image} />
                                        <Card.Body>
                                            <Card.Title className="w-2">{item?.title}</Card.Title>
                                            <Card.Text>price: {item?.price}$</Card.Text>
                                            <Card.Text>category: {item?.category}</Card.Text>
                                            <Card.Text>rating: {item?.rating.rate}</Card.Text>
                                            <Card.Text>count: {item?.rating.count}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                </Row>
            </Container>
        </>
    )
}

export default MainPage