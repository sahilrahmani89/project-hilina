// pages/login.js
"use client"
import Image from 'next/image';
import Input from '../forms/Input';
import useLogin from './hooks/useLogin';
import Button from '../forms/Button';
import SignInWithGoogle from './SignInWithGoogle';
import Link from 'next/link';
import Alert, {useAlert} from '../alert/Alert';

const Login = () => {
  const { 
    cred, 
    handleSubmit, 
    loginOnChange,
    loginError,
    loading,
   } = useLogin({ useAlert })
  return (
    <>
    <Alert/> 
    <div className="flex flex-col h-screen md:flex-row">
      <div className="relative md:w-1/2 w-full  md:h-full">
        <Image
          src="https://via.placeholder.com/600x800"
          alt="Background"
          // layout="fill"
          width={1920}
          height={1080}
          // objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center md:w-1/2 w-full bg-[#eee] bg-opacity-90 p-6 md:h-auto h-[90vh]">
        <div className='w-full max-w-sm'>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className='w-full my-2'>
            <SignInWithGoogle />
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label='Email'
                name='email'
                type='text'
                required
                onChange={loginOnChange}
                value={cred.email}
              />
            </div>
            <div className="mb-6">
              <Input
                name='password'
                label='Password'
                value={cred.password}
                onChange={loginOnChange}
                type='password'
                required
              />
            </div>
            <Button
              loading={loading}
            >
              Login
            </Button>
          </form>
          {
            loginError && <p className='text-rose-600'>{loginError}</p>
          }
          <div >
            <p className="text-sm text-center my-3">
              Don't have an account? <Link href="/signup" className="text-[#f9e136] hover:underline font-bold text-[18px]">Sign up</Link>
            </p>
            <p className='py-2'>
                Forgot password ? <Link href={"/forgot-password"} className='text-blue-600'>
                    Click Here
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Login;
