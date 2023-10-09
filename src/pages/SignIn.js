import React, { useState } from 'react';
import { AiFillLock, AiFillUnlock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { BeatLoader } from 'react-spinners';


const SignIn = () => {
    const { signIn } = UserAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true)

    const handleVisibility = (e) => {
        e.preventDefault()
        setHidden(!hidden)
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true);
        try {
            await signIn(email, password)
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
        setLoading(false);
    }


    return (
        <div>
            <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
                <h1 className='text-2xl font-bold relative'>Sign In</h1>
                {error ? <p className='bg-red-300 p-3 my-2'>{error}</p> : null}
                <form onSubmit={handleSignIn}>
                    <div className='my-4'>
                        <label>Email</label>
                        <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className='w-full p-2 bg-primary border border-input rounded-2xl' type='email' />
                            <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
                        </div>
                    </div>
                    <div className='my-4'>
                        <label>Password</label>
                        <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                            <input
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className='w-full p-2 bg-primary border border-input rounded-2xl' type={hidden ? 'password' : 'text'} />
                            {hidden ? <AiFillLock size={20} onClick={handleVisibility} className='absolute right-2 top-3 text-gray-400' /> : <AiFillUnlock size={20} onClick={handleVisibility} className='absolute text-green-500 right-2 top-3 ' />}
                        </div>
                    </div>
                    <button className='w-full my-2 p-3 bg-[#64CCC5] text-btnText rounded-2xl shadow-xl hover:bg-[#1AACAC]'>Sign In</button>
                    {loading ? (<div className="flex justify-center items-center w-full h-full bg-gradient-to-br from-opacity-40 to-opacity-60 backdrop-blur-sm absolute top-0 left-0">
                        <BeatLoader color="#36d7b7" loading={loading} size={25} />
                    </div>) : null}
                </form>
                {/* <p className='my-4'>Don't have an account?<Link to='/signup' className='text-[#64CCC5]'> Sign up</Link></p> */}
            </div>
        </div>
    );
}

export default SignIn;
