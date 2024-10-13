"use client"
import React from 'react'
import Input from '../forms/Input'
import Button from '../forms/Button'
import useSignup from './hooks/useSignup'
import Link from 'next/link'
import Image from 'next/image'
import SignInWithGoogle from './SignInWithGoogle'

const Signin = () => {
  const {
    error,
    handleOnChange,
    handleSubmit,
    signCred,
  } = useSignup()
  return (
  <div className="flex flex-col h-screen md:flex-row">
    <div className="relative md:w-1/2 w-full  md:h-full">
      <Image
        src="https://via.placeholder.com/600x800"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <div className="flex items-center justify-center md:w-1/2 w-full bg-[#eee] bg-opacity-90 p-6 md:h-auto h-[90vh]">
        <div className='w-full max-w-sm'>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <div className='w-full my-2'>
            <SignInWithGoogle />
          </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
                name='name'
                placeholder='Enter your name'
                value={signCred.name}
                onChange={handleOnChange}
                required
                label='Name'
            />
          </div>
          <div className="mb-4">
            <Input
             type='email'
             name='email'
             placeholder='Enter your email'
             value={signCred.email}
             onChange={handleOnChange}
             required
             label='Email'
            />
          </div>
          <div className="mb-4">
            <Input
                type='password'
                name='password'
                placeholder='Enter your password'
                value={signCred.password}
                onChange={handleOnChange}
                required
                label='Password'
            />
          </div>
          <div className="mb-4">
            <Input
                type='password'
                name='cnfPassword'
                placeholder='Confirm your password'
                value={signCred.cnfPassword}
                onChange={handleOnChange}
                required
                label='Confirm your password'
                error={error}
            />
          </div>
          
          <Button>
              Signup
          </Button>
        </form>
        <div >
            <p className="text-sm text-center my-3">
              Already have an account? 
            <Link href="/login" 
              className="text-[#f9e136] hover:underline font-bold text-[18px]">Login Here!
            </Link>
            </p>
          </div>
          </div>
    </div>
  </div>

  )
}

export default Signin
