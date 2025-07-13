import React, {useContext, useState} from 'react';
import {base_url} from '../../config/config';
import axios from 'axios'
import toast from 'react-hot-toast'
import storeContext from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {dispatch} = useContext(storeContext);
    const [state, setState] = useState({
        email : "",
        password : ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = async(e) => {
        e.preventDefault()
        setLoader(true);
        try {
            const { data } = await axios.post(`${base_url}/api/login`, state)
            setLoader(false)
            console.log(data)

            localStorage.setItem('newsToken', data.token)
            toast.success(data.message)

            dispatch({
                type: "login_success",
                payload: {
                    token: data.token
                }
            })

            // Arahkan berdasarkan role user
            const role = data.user?.role; // pastikan backend mengirimkan ini
            if (role === 'admin') {
                navigate('/dashboard/admin');
            } else if (role === 'writer') {
                navigate('/dashboard/writer');
            } else {
                navigate('/dashboard'); // fallback jika role tidak dikenali
            }

        } catch (error) {
            setLoader(false)
            toast.error(error.response?.data?.message || "Login failed")
        }
    }


    return (
        <div className='min-h-screen bg-sky-100 flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-lg w-[400px]'>
                <div className='p-8'>
                    <div className='flex justify-center mb-8'>
                        <img className="w-[200px]" src="http://res.cloudinary.com/dtby9tf0z/image/upload/v1751265488/news_images/ywhmk47hcef7ecscbbdz.png" alt="" />
                    </div>
                    <form  onSubmit={submit} className='space-y-6 '>
                        <div>
                            <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input value={state.email} onChange={inputHandle} type="email" name='email' id='email' placeholder='Enter your email' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition' />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input onChange={inputHandle} value={state.password} type="password" name='password' id='password' placeholder='Enter your email' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition' />
                        </div>

                        <div>
                            <button type='submit' disabled={loader} className={`w-full py-3 text-white rounded-md transition font-semibold ${loader ? 'bg-blue-400 cursor-not-allowed' :'bg-sky-400 hover:bg-sky-500'}`}>
                                {loader? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;