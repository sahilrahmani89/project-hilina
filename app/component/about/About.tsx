"use client"
import { useHttpService } from '@/app/providers/AccessTokenProvider'
import React, { useEffect } from 'react'

const About = () => {
    const int = useHttpService()
    useEffect(()=>{
        getProfile()
    },[])
    //
    const getProfile = async() =>{
        try{
            const res = int.get('/api/profile')
            console.log('response',res)
        }catch(err){
            console.log('err',err)
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default About
