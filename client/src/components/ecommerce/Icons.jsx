
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext, useEffect, useRef } from 'react'
import { IconsContext } from '../../contexts/IconsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';


const Icons = () => {
    const { globalCart, globalWishList } = useContext(IconsContext);
    const [cart, setCart] = globalCart;
    const [wishList, setWishList] = globalWishList;
    const cartRef = useRef();
    const wishListRef = useRef();
    const navigate = useNavigate()

    const logOut = () => {
        axios.get('http://localhost:8000/api/logout')
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        if (cartRef && cartRef.current) {
            cartRef.current.classList.toggle("active");

        }
        setTimeout(() => {
            if (cartRef && cartRef.current) {
                cartRef.current.classList.toggle("active");

            }
        }, 1000);
    }, [cart]);
    useEffect(() => {

        if (wishListRef && wishListRef.current) {
            wishListRef.current.classList.toggle("active");

        }
        setTimeout(() => {
            if (wishListRef && wishListRef.current) {
                wishListRef.current.classList.toggle("active");

            }
        }, 1000);

    }, [wishList]);
    return (
        <div className="d-flex ms-auto gap-3">
            <Link className="btn btn-outline-dark" to="/ecommerce/wish-list">
                <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" ref={wishListRef} />
                WishList
                <span className="badge bg-dark text-white ms-1 rounded-pill">{wishList?.products ? wishList.products.length : 0}</span>
            </Link>
            <Link className="btn btn-outline-dark" to="/ecommerce/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="me-1 text-primary" ref={cartRef} />
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{cart?.products ? cart.products.length : 0}</span>
            </Link>

            <Link className="border rounded-circle" >


                <span className="badge bg-dark text-white ms-1 "></span>
            </Link>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} className="me-1 text-white" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logOut()}>LogOut</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Icons
