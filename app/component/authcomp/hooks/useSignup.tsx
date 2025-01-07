"use client"
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
  const router = useRouter()
  const [error, setError] = useState<string>('');
  const [formError,setFormError] = useState('')
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for matching passwords
    if (signCred?.password !== signCred?.cnfPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    let {cnfPassword,...params} = signCred
    try{
        const res = await axios.post('/api/auth/signup',{...params})
        if(res.status>=200 && res.status<=301){
            router.push('/login')
        }  
    }catch(err){
      console.log('err',err)
      setFormError((err as Error).message)
      setsignCred({
        name: '',
        email: '',
        password: '',
        cnfPassword: ''
      });
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
  }
}

export default useSignup