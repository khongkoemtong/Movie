import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='h-[100vh]'>
            <div
                className="flex items-center relative  justify-center h-[100%]  -mt-7 bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.pinimg.com/736x/40/f1/7b/40f17b47f4d5da75c2a571a0c31647dd.jpg')" }}
            >
                <div className='absolute inset-0 bg-black/50'></div>
                <div className="w-full max-w-md bg-gray-950 bg-opacity-80 rounded-2xl shadow-lg p-8 z-3">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">Login  sin kon !</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-300 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 text-indigo-500" /> Remember me
                            </label>
                            <a href="#" className="text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                        </div>

                        <Link to="/tv">
                            <button
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-200"
                            >
                                Sign In
                            </button>
                        </Link>

                        <p className="text-center text-sm text-gray-400 mt-4">
                            Don’t have an account?
                            <a href="#" className="text-indigo-400 hover:text-indigo-300">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
