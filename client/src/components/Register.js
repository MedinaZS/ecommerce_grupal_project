import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/register', { firstName, lastName, email, password, confirmPassword }, { withCredentials: true })
            .then((response) => {
                if (response.data.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/ecommerce')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='col-4 mx-auto mt-3'>
            <h1>Registration</h1>
            <hr />
            <form onSubmit={onSubmitHandler}>
                <label className='form-label'>First Name:</label>
                <input type="text" className='form-control mb-3' onChange={(e) => setFirstName(e.target.value)} />

                <label className='form-label'>Last Name:</label>
                <input type="text" className='form-control mb-3' onChange={(e) => setLastName(e.target.value)} />

                <label className='form-label'>Email:</label>
                <input type="text" className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} />

                <label className='form-label'>Password:</label>
                <input type="password" className='form-control mb-3' onChange={(e) => setPassword(e.target.value)} />

                <label className='form-label'>Confirm Password:</label>
                <input type="password" className='form-control mb-3' onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type='submit' className='btn btn-success mt-3'>Register</button>
            </form>
        </div>
    )
}

export default RegisterForm