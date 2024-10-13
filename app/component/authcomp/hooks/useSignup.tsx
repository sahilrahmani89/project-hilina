"use client"
import axios from "axios";
import React, { useState } from "react";

const useSignup = () =>{
    const [signCred,setsignCred] = useState({
        name:'',
        email:'',
        password:'',
        cnfPassword:''
    })

  const [error, setError] = useState('');

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
        console.log('res',res)
    }catch(err){
            console.log('err')
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
  }
}

export default useSignup