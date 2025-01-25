"use client"
import { useAlert } from "@/app/providers/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const useSignup = () =>{
  const [signCred,setsignCred] = useState({
      name:'',
      email:'',
      password:'',
      cnfPassword:''
  })
  const [loading,setloading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState<string>('');
  const [formError,setFormError] = useState('')
  const triggerAlert = useAlert()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for matching passwords
    if (signCred?.password !== signCred?.cnfPassword) {
      triggerAlert('Passwords do not match','warning')
      // setError('Passwords do not match');
      return;
    }
    setError('');
    let {cnfPassword,...params} = signCred
    setloading(true)
    try{
        const response = await axios.post('/api/auth/signup',{...params})
        const res = response.data
        setloading(false)
        if(res.statusCode>=200 && res.statusCode<=300){
            triggerAlert('Sign up successfull','success')
            router.push('/login')
        }  
    }catch(err){
      triggerAlert((err as Error).message ?? 'Something went wrong','danger')
      // setFormError((err as Error).message)
      setsignCred({
        name: '',
        email: '',
        password: '',
        cnfPassword: ''
      });
      setloading(false)
      setTimeout(() => {
        setFormError('')
      }, 4000);
    }
    
  };
  const handleOnChange = (e:any)=>{
    const {value,name} = e.target || {}
    setsignCred((prev:any)=>{
        return{
            ...prev,
            [name]:value
        }
    }) 
  }
  return{
    handleOnChange,
    signCred,
    handleSubmit,
    error,
    formError,
    loading,
  }
}

export default useSignup