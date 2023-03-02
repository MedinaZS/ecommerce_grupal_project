import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import Footer from '../Footer';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const List = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, []);

    const navigate = useNavigate()


    const fetchCategories = () => {
        axios.get('http://localhost:8000/api/categories', { withCredentials: true })
            .then((response) => {
                setCategories(response.data.categories)
            })
            .catch((error) => console.log("Error", error));
    }
    const remove = categoryId => {
        axios.delete(`http://localhost:8000/api/categories/${categoryId}`, { withCredentials: true })
            .then(() => {
                setCategories(categories.filter(category => category._id !== categoryId))
            })
            .catch((error) => console.log("Error", error));
    }

    return (
        <>
            <Navbar></Navbar>
            <h3 className='text-center'>Categories</h3>
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Add New</Tooltip>}
                        >
                            <Link className='btn btn-success' to="/admin/categories/create"><FontAwesomeIcon icon={faPlus} /></Link>
                        </OverlayTrigger>
                    </div>
                    <div className='card-body'>
                        <table className="table table-hover table-striped table-sm table-borderless">
                            <thead>
                                <tr className='text-center'>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={index} className="text-center">
                                        <th>{index + 1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td><span className='d-flex gap-3 justify-content-center'>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>Edit Category</Tooltip>}
                                            >
                                                <Link className='btn btn-warning text-white' to={`/admin/categories/${category._id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>Delete Category</Tooltip>}
                                            >
                                                <button type='button' onClick={() => remove(category._id)} className='btn btn-secondary'><FontAwesomeIcon icon={faTrash} /></button>
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





