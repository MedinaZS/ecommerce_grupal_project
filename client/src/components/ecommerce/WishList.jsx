import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';
import Footer from './Footer';
import { IconsContext } from '../../contexts/IconsContext'
import numberFormatter from '../utilities/numberFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Cart = () => {
    const { globalCart, globalWishList } = useContext(IconsContext);
    const [cart, setCart] = globalCart;
    const [wishList, setWishList] = globalWishList;


    const removeItem = async (item) => {
        const data = {
            product: item.product._id,
        }
        await axios.delete(`http://localhost:8000/api/wish-list/${wishList._id}`, { data: data, withCredentials: true })
            .then((response) => {
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            });
    }

    const addToCart = async (item) => {

        const data = {
            product: item.product._id,
            cart: cart._id
        }


        await axios.put(`http://localhost:8000/api/wish-list/${wishList._id}/move-to-cart`, data, { withCredentials: true })
            .then((response) => {
                setCart(response.data.cart);
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    return (
        <>
            <Navbar renderIcons={false}></Navbar>
            <div className='container'>
                <h3 className='text-center'>My WishList</h3>
                <div className='row text-start'>
                    <div className='col-md-12'>
                        <div className='card mb-5'>
                            <div className='card-body p-5'>
                                <h5 className='fw-bold'>Items</h5>
                                <table className="table table-hover table-striped table-sm text-center table-borderless">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Stock </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishList?.products && wishList.products.map((item, index) => (
                                            <tr key={index} className="align-middle text-center">
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span>{item.product.name}</span><br />
                                                    <span className='text-muted small'>{item.product.description}</span>
                                                </td>

                                                <td className='text-end'>{numberFormatter(item.product.price)}</td>
                                                <td className='text-end'>{item.product.stock}</td>
                                                <td>
                                                    <span className='d-flex gap-3 justify-content-center'>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Add To Cart</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faShoppingCart} className="me-1 text-primary cursor-pointer" onClick={() => addToCart(item)} />
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Delete from WishList</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="me-1 text-secondary cursor-pointer" onClick={() => removeItem(item)} />
                                                        </OverlayTrigger>
                                                    </span>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card-footer'>
                                <Link className="btn btn-outline-success" to="/ecommerce">
                                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Contine to Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Cart





