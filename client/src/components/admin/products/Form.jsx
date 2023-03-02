import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';

const Form = ({ editMode }) => {
    //CATEGORIES
    const [allCategories, setAllCategories] = useState([]);

    //PRODUCT
    const [name, setName] = useState({
        value: '',
        error: ''
    });

    const [barcode, setBarcode] = useState({
        value: '',
        error: ''
    });

    const [description, setDescription] = useState({
        value: '',
        error: ''
    });

    const [categories, setCategories] = useState({
        value: [],
        error: ''
    });

    const [stock, setStock] = useState({
        value: '',
        error: ''
    });

    const [price, setPrice] = useState({
        value: '',
        error: ''
    });



    const { id } = useParams();
    const navigate = useNavigate();


    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (editMode) {
            updateProduct();
        } else {
            createProduct();
        }
    }

    const fetchAllCategories = () => {
        axios.get('http://localhost:8000/api/categories', { withCredentials: true })
            .then((response) => {
                setAllCategories(response.data.categories)
            })
            .catch((error) => console.log("Error", error));
    }

    const createProduct = () => {
        const data = {
            name: name.value,
            barcode: barcode.value,
            description: description.value,
            categories: categories.value,
            stock: stock.value,
            price: price.value,
        }
        axios.post('http://localhost:8000/api/products/create', data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/products');
            })
            .catch((error) => {
                const errors = error.response.data.error.errors;
                setErrors(errors);


            })
    }

    const updateProduct = () => {
        const data = {
            name: name.value,
            barcode: barcode.value,
            description: description.value,
            categories: categories.value,
            stock: stock.value,
            price: price.value,
        }
        axios.put(`http://localhost:8000/api/products/${id}`, data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/products')
            })
            .catch((error) => {
                const errors = error.response.data.error.errors;
                console.log(error.response.data.error);
                setErrors(errors);
            })
    }
    const setErrors = (errors) => {
        if (errors.name) {
            setName({ ...name, error: errors.name.message })
        } else {
            setName({ ...name, error: '' })
        }

        if (errors.barcode) {
            setBarcode({ ...barcode, error: errors.barcode.message })
        } else {
            setBarcode({ ...barcode, error: '' })
        }

        if (errors.description) {
            setDescription({ ...description, error: errors.description.message })
        } else {
            setDescription({ ...description, error: '' })
        }

        if (errors.categories) {
            setStock({ ...categories, error: errors.categories.message })
        } else {
            setStock({ ...categories, error: '' })
        }

        if (errors.stock) {
            setStock({ ...stock, error: errors.stock.message })
        } else {
            setStock({ ...stock, error: '' })
        }

        if (errors.price) {
            setStock({ ...price, error: errors.price.message })
        } else {
            setStock({ ...price, error: '' })
        }

    }
    const reset = () => {
        setName({
            value: '',
            error: ''
        });
    }

    useEffect(() => {
        if (editMode && id) {
            reset();
            fetchProduct();
        }
        fetchAllCategories();
    }, []);


    const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/products/${id}`, { withCredentials: true })
            .then((response) => {
                const data = response.data.product;
                reset();
                setName({ ...name, value: data.name });
                setBarcode({ ...barcode, value: data.barcode });
                setDescription({ ...description, value: data.description });
                setCategories({ ...categories, value: data.categories });
                setStock({ ...stock, value: data.stock });
                setPrice({ ...price, value: data.price });
            })
            .catch((error) => {
                navigate('/error')
            });
    }


    return (
        <>
            <Navbar></Navbar>
            <form className='' onSubmit={onSubmitHandler}>
                <div className='container'>
                    <div className='card border-0'>
                        <div className='card-body '>
                            <div className='row justify-content-center'>
                                <div className='col-md-6 shadow p-4 text-start'>
                                    <h3 className='text-center'>Product Form</h3>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Barcode</label>
                                                <input name='barcode' required type="text" className={`form-control ${barcode.error.length ? 'border-danger' : ''}`} defaultValue={barcode.value} onChange={(e) => setBarcode({ ...barcode, value: e.target.value })} />
                                                {barcode.error.length ?
                                                    <small className='text-danger'>{barcode.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Name</label>
                                                <input name='name' required type="text" className={`form-control ${name.error.length ? 'border-danger' : ''}`} defaultValue={name.value} onChange={(e) => setName({ ...name, value: e.target.value })} />
                                                {name.error.length ?
                                                    <small className='text-danger'>{name.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Description</label>
                                                <input name='description' required type="text" className={`form-control ${description.error.length ? 'border-danger' : ''}`} defaultValue={description.value} onChange={(e) => setDescription({ ...description, value: e.target.value })} />
                                                {description.error.length ?
                                                    <small className='text-danger'>{description.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='form-group' >
                                                <label className='fw-bold'>Categories</label>
                                                <Select
                                                    className="text-start"
                                                    isMulti
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    value={categories.value.map(item => ({ value: item, label: item.name }))}
                                                    name="categories"
                                                    options={allCategories.map((item) => {
                                                        return { value: item, label: item.name }
                                                    })}
                                                    onChange={(e) => setCategories({ ...categories, value: e.map(item => item.value) })}

                                                />
                                                {categories.error.length ?
                                                    <small className='text-danger'>{categories.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Stock</label>
                                                <input name='stock' required type="number" className={`form-control ${stock.error.length ? 'border-danger' : ''}`} defaultValue={stock.value} onChange={(e) => setStock({ ...stock, value: e.target.value })} />
                                                {stock.error.length ?
                                                    <small className='text-danger'>{stock.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Price</label>
                                                <input name='price' required type="number" className={`form-control ${price.error.length ? 'border-danger' : ''}`} defaultValue={price.value} onChange={(e) => setPrice({ ...price, value: e.target.value })} />
                                                {price.error.length ?
                                                    <small className='text-danger'>{price.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center gap-5'>
                                        <Link to="/admin/products" className='btn btn-secondary'>Cancel</Link>
                                        <button type="submit" className="btn btn-primary px-4 text-center">{editMode ? 'Update' : 'Create'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
            <Footer></Footer>
        </>
    )
}

export default Form