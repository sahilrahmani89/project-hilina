"use client"
import { ChangeEvent, useState } from "react"

const useLogin = () =>{
    const [cred,setcred] = useState({email:'',password:''})
    const loginOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target || {}
        setcred((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        console.log('e',e)
        try{

        }catch(err){

        }
    }
    return{
        handleSubmit,
        cred,
        loginOnChange,
    }
}
export default useLogin