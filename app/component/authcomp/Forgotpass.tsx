"use client"
import React, { useState } from 'react';
import Input from '../forms/Input';
import Button from '../forms/Button';
import axios from 'axios';

const ForgotPass = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  
  const handleEmailSubmit = async(e:any) => {
    e.preventDefault();
    const response:any= await getAPI(email)
    console.log('response',response)
    if(response?.data?.statusCode >=200 && response?.data?.statusCode<=299){
       setStep(2); 
    }else{
      setError(response?.data?.message)
    } 
  };

  const getAPI = async (email:string) => {
    try{
        const res = await axios.post('/api/auth/getOtp',{
          email,
        })
       return res 
    }catch(err){
      console.log('err', err)
      return err
    }
  }
  //get otp from server 
  const verifyOTP = async (email:string) => {
    try{
        const res = await axios.post('/api/auth/verifyOtp',{
          email,
          otp
        })
       return res 
    }catch(err){
      console.log('err', err)
      return null
   }
  }
  const handleOtpSubmit = async(e:any) => {
    e.preventDefault();
    // Simulate OTP validation
    const serverOtp = await verifyOTP(email)
    if(serverOtp?.data?.statusCode >=200 && serverOtp?.data?.statusCode<=299){
       setStep(3);
    }else {
      console.log('Invalid OTP');
      setError('Invalid OTP')
    }
  };

  const handlePasswordSubmit = (e:any) => {
    e.preventDefault();
    // Simulate password reset
    console.log('Password reset successful');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>
        
        {/* Step 1: Email input */}
        {step === 1 && (
          <form className="space-y-4">
            <div>
              <Input
                type='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email Address'
              />
            </div>
            <Button onClick={(e)=>handleEmailSubmit(e)}>
              Send OTP
            </Button>
          </form>
        )}
        
        {/* Step 2: OTP input */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}
        
        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
