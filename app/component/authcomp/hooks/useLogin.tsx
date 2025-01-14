"use client"
import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

const useLogin = () =>{
    const [cred,setcred] = useState({email:'',password:''})
    const [loginError,setloginError] = useState('')
    const router = useRouter()
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
        try{
            const res = await signIn( "credentials",{
                redirect:false,
                username:cred?.email,
                password:cred?.password
            })
            if(res?.error){
              setloginError('Authentication Failed')
            }else{
                router.push('/')
            }
        }catch(err){
            setloginError((err as Error).message)
            setTimeout(() => {
                setloginError('')
            }, 4000);
        }
    }
    return{
        handleSubmit,
        cred,
        loginOnChange,
        loginError,
    }
}
export default useLogin