"use server"
import React from 'react'
import LoginGoogle from '@/components/LoginGoogle'

const SignIn = () => {
    return (
        <div className="w-full flex mt-20 justify center">
            <section className='flex flex-col w-[400px]'>
                <h1>
                    Sign In
                </h1>
                <LoginGoogle/>
            </section>
            
        </div>
    )
}

export default SignIn