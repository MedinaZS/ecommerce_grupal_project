import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';
import numberFormatter from '../../utilities/numberFormatter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const List = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, []);

    const navigate = useNavigate()


    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => console.log("Error", error));
    }


    return (
        <>
            <Navbar></Navbar>
            <h3 className='text-center'>Products</h3>
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add New</Tooltip>}
                        >
                            <Link className='btn btn-success' to="/admin/products/create"><FontAwesomeIcon icon={faPlus} /></Link>
                        </OverlayTrigger>
                    </div>
                    <div className='card-body'>
                        <table className="table table-hover table-striped table-sm table-borderless">
                            <thead>
                                <tr className='text-center'>
                                    <th>#</th>
                                    <th>Barcode</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Categories</th>
                                    <th>Price</th>
                                    <th>Stock </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{product.barcode}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.categories.map(item => item.name).join(', ')}</td>
                                        <td className='text-end'>{numberFormatter(product.price)}</td>
                                        <td className='text-end'>{product.stock}</td>
                                        <td><span className='d-flex gap-3 justify-content-center'>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>Edit Product</Tooltip>}
                                            >
                                                <Link className='btn btn-warning text-white' to={`/admin/products/${product._id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
                                            </OverlayTrigger>
                                        </span></td>
                                    </tr>

                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
            <Footer></Footer>
        </>
    )
}

export default List





