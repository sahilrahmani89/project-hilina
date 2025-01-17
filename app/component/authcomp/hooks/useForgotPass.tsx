import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useForgotPass = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handlePasswordSubmit = async(e:any) => {
    
    e.preventDefault();
    if(password !== confirmPassword){
        setError('Password does not match')
        return
    }
    try{
        const res = await axios.put('/api/auth/updatepassword',{
          email,
          password
        })
        if(res?.data?.statusCode >=200 && res?.data?.statusCode<=299){
          console.log('Password reset successful');
          router.push('/login')
        }else{
          setError(res?.data?.message)
        }
    }catch(err){}
    // Simulate password reset
    console.log('Password reset successful');
  };
  return{
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
    setConfirmPassword
  }
}
export default useForgotPass