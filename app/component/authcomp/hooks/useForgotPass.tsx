import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAlert } from "../../../providers/Alert";
import { useSession } from "next-auth/react";
import HttpService from "@/app/service/Http.service";

const useForgotPass = () => {
  const triggerAlert = useAlert()
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError] = useState('')
  const [loading,setloading] = useState(false)
  
  const handleEmailSubmit = async(e:any) => {
    e.preventDefault();
    if(!email)  {
      triggerAlert('Fill your email', 'warning') 
      return
    }
    const response:any= await getAPI(email)
    // console.log('response',response)
    if(response?.data?.statusCode >=200 && response?.data?.statusCode<=299){
       triggerAlert(response?.data?.message ?? 'Otp has been sent to your email', 'success')
       setStep(2); 
    }else{
      setError(response?.data?.message)
      triggerAlert(response?.data?.message ?? 'Something went wrong', 'danger')
    } 
  };

  const getAPI = async (email:string) => {
    setloading(true)
    try{
        
        const res = await axios.post('/api/auth/getOtp',{
          email,
        })
        setloading(false)
       return res 
    }catch(err){
      console.log('err', err)
      setloading(false)
      return err
    }
  }
  //get otp from server 
  const verifyOTP = async (email:string) => {
    setloading(true)
    if(!otp) {
      triggerAlert('Fill otp','warning')
      return
    }
    try{
        
        const res = await axios.post('/api/auth/verifyOtp',{
          email,
          otp
        })
      setloading(false)
       return res 
    }catch(err){
      console.log('err', err)
      setloading(false)

      return null
   }
  }
  const handleOtpSubmit = async(e:any) => {
    e.preventDefault();
    // Simulate OTP validation
    const serverOtp:any = await verifyOTP(email)
    if(serverOtp?.data?.statusCode >=200 && serverOtp?.data?.statusCode<=299){
    triggerAlert(serverOtp?.data?.message ?? 'Otp has been verified', 'success')

       setStep(3);
    }else {
      console.log('Invalid OTP');
      setError('Invalid OTP')
     triggerAlert(serverOtp?.data?.message ?? 'Invalid Otp', 'danger')
    }
  };

  const handlePasswordSubmit = async(e:any) => {
    setloading(true)
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
        setloading(true)
        if(res?.data?.statusCode >=200 && res?.data?.statusCode<=299){
          console.log('Password reset successful');
          triggerAlert(res?.data?.message ?? 'Password Changes', 'success')

          router.push('/login')
        }else{
          setError(res?.data?.message)
          triggerAlert(res?.data?.message ?? 'Password Changes', 'success')
        }
    }catch(err){
      triggerAlert((err as Error).message ?? 'Something went wrong', 'success')
    }
    // Simulate password reset
    setloading(true)
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
    setConfirmPassword,
    loading,
  }
}
export default useForgotPass