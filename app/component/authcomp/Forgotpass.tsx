"use client"
import React from 'react';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForgotPass from './hooks/useForgotPass';


const ForgotPass = () => {
  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    password,
    setPassword,
    error,
    handleEmailSubmit,
    handleOtpSubmit,
    handlePasswordSubmit,
    confirmPassword,
    setConfirmPassword,
    loading,
  } = useForgotPass();
  return (
    <>
    {/* <Alert /> */}
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
                required
              />
            </div>
            <Button 
             loading={loading}
             onClick={(e)=>handleEmailSubmit(e)}>
              Send OTP
            </Button>
          </form>
        )}
        
        {/* Step 2: OTP input */}
        {step === 2 && (
          <>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <Input
                type='text'
                name='otp'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                label='Enter OTP'
                required
              />
            </div>
            <Button 
             loading={loading}
            >
              Verify OTP
            </Button>
          </form>
          <p className="text-red-500 text-center">{'Do not refresh'}</p>
          </>
        )}
        
        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Input
                type='password'
                name='password'
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='New Password'
                required
              />
              <Input
                type='password'
                name='Confirm password'
                placeholder='Enter password again'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label='New Password'
                required
              />
            </div>
            <Button
             loading={loading}
            >
              Reset Password
            </Button>
          </form>
          <p className="text-red-500 text-center">{'Do not refresh'}</p>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default ForgotPass;
