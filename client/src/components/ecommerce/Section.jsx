import React, { useState, useEffect } from 'react';
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import numberFormatter from '../utilities/numberFormatter';
import { IconsContext } from '../../contexts/IconsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Section = () => {
    const { globalCart, globalWishList } = useContext(IconsContext);
    const [cart, setCart] = globalCart;
    const [wishList, setWishList] = globalWishList;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        category: null,
        search: null
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        searchProduct();
    }, [filter]);


    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => console.log("Error", error));
    }

    const fetchCategories = () => {
        axios.get('http://localhost:8000/api/categories', { withCredentials: true })
            .then((response) => {
                setCategories(response.data.categories)
            })
            .catch((error) => console.log("Error", error));
    }

    const searchProduct = async () => {
        await axios.get('http://localhost:8000/api/products/search', { params: filter, withCredentials: true })
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log("Error", error)
            });
    }

    const addProductToCart = async (product) => {

        const data = {
            product: product._id,
            quantity: 1,
        }
        await axios.put(`http://localhost:8000/api/cart/${cart._id}`, data, { withCredentials: true })
            .then((response) => {
                setCart(response.data.cart);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }
    const addProductToWishList = async (product) => {

        const data = {
            product: product._id,
        }
        await axios.put(`http://localhost:8000/api/wish-list/${wishList._id}`, data, { withCredentials: true })
            .then((response) => {
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    const manageFilterCategory = (categoryId) => {
        if (categoryId === filter.category) {
            setFilter({ ...filter, category: null })
        } else {
            setFilter({ ...filter, category: categoryId })
        }
    }

    const checkIsFavorite = (product) => {
        let flag = false
        if (wishList && wishList.products.length) {
            flag = wishList.products.some(item => item.product._id === product._id);
        }
        return flag;
    }
    return (
        <section >
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row">
                    <div className='col-md-2'>
                        <div className="btn-group-vertical w-100" role={'group'}>
                            {categories.map((category, idx) => (
                                <button key={idx} type="button" className={`btn btn-outline-dark mb-1 ${filter.category === category._id ? 'active' : ''}`} onClick={() => manageFilterCategory(category._id)}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>{category.name}</span>
                                        <span className="badge bg-light border text-dark rounded-pill">{category.productsCount}</span>
                                    </div>
                                </button>
                            ))
                            }

                        </div>
                    </div>
                    <div className='col-md-10 '>
                        <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-4 row-cols-xl-4 overflow-auto'>

                            {products.map((product, idx) => (
                                <div className="col mb-5" key={idx}>
                                    <div className="card h-100 p-3">
                                        {checkIsFavorite(product) ?
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>This item is favorite ❤</Tooltip>}
                                            >
                                                <FontAwesomeIcon className=" bg-danger  text-white rounded-circle  position-absolute favorite p-1" icon={faHeart} />
                                            </OverlayTrigger>
                                            : ''}

                                        <div id={`carouselExampleControls${idx}`} className="carousel carousel-dark slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {product.images.map((image, idxImg) => (
                                                    <div className={`carousel-item text-center  ${idxImg === 0 ? 'active' : ''}`} key={idxImg} >
                                                        <LazyLoadImage
                                                            src={image}
                                                            className="d-block w-100 h-100"
                                                            style={{ maxHeight: '145px', minHeight: '145px' }}
                                                            effect="blur"
                                                        />
                                                    </div>

                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${idx}`} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${idx}`} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder">{product.name}</h5>

                                                <div>{numberFormatter(product.price)}</div>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="d-flex gap-3 justify-content-center">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={<Tooltip>Add to Cart</Tooltip>}
                                                >
                                                    <button type='button' className="btn btn-outline-primary" onClick={() => addProductToCart(product)}><FontAwesomeIcon icon={faShoppingCart} /></button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={<Tooltip>Add to Wish List</Tooltip>}
                                                >
                                                    <button type='button' className="btn btn-outline-danger" onClick={() => addProductToWishList(product)}><FontAwesomeIcon icon={faHeart} /></button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section
