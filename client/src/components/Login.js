import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true })
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
            <h1>Login</h1>
            <hr />
            <form onSubmit={onSubmitHandler}>

                <label className='form-label'>Email:</label>
                <input type="text" className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} />

                <label className='form-label'>Password:</label>
                <div className='input-group'>
                    <input type="password" className='form-control' id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type='submit' className='btn btn-success mt-4'>Login</button>
            </form>
        </div>
    )
}

export default Login
