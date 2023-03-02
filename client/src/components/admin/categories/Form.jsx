import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';

const Form = ({ editMode }) => {
    const [name, setName] = useState({
        value: '',
        error: ''
    });

    const [description, setDescription] = useState({
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

    const createProduct = () => {
        const data = {
            name: name.value,
            description: description.value,
        }
        axios.post('http://localhost:8000/api/categories/create', data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/categories');
            })
            .catch((error) => {
                const errors = error.response.data.error.errors;
                setErrors(errors);


            })
    }

    const updateProduct = () => {
        const data = {
            name: name.value,
            description: description.value,
        }
        axios.put(`http://localhost:8000/api/categories/${id}`, data, { withCredentials: true })
            .then(() => {
                reset();
                navigate('/admin/categories')
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

        if (errors.description) {
            setDescription({ ...description, error: errors.description.message })
        } else {
            setDescription({ ...description, error: '' })
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
            fetchData();
        }
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:8000/api/categories/${id}`, { withCredentials: true })
            .then((response) => {
                const data = response.data.category
                reset();
                setName({ ...name, value: data.name });
                setDescription({ ...description, value: data.description });
            })
            .catch((error) => {
                // navigate('/error');
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
                                    <h3 className='text-center'>Category Form</h3>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Name</label>
                                                <input name='name' required type="text" className={`form-control ${name.error.length ? 'border-danger' : ''}`} value={name.value} onChange={(e) => setName({ ...name, value: e.target.value })} />
                                                {name.error.length ?
                                                    <small className='text-danger'>{name.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mb-3'>
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <label className='fw-bold'>Description</label>
                                                <input name='description' required type="text" className={`form-control ${description.error.length ? 'border-danger' : ''}`} value={description.value} onChange={(e) => setDescription({ ...description, value: e.target.value })} />
                                                {description.error.length ?
                                                    <small className='text-danger'>{description.error}</small> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-center gap-5'>
                                        <Link to="/admin/categories" className='btn btn-secondary'>Cancel</Link>
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



