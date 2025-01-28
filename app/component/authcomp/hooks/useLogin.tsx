"use client"
import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useAlert } from "../../../providers/Alert";
import axios from "axios";


const useLogin = () =>{
    const triggerAlert = useAlert()
    const [cred,setcred] = useState({email:'',password:''})
    const [loginError,setloginError] = useState('')
    const [loading,setloading] = useState(false)
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
        setloading(true)
        console.log('hhffhfj')
        try{
            const response = await axios.post(`/api/auth/login`,{
                email:cred?.email,
                password:cred?.password
            }) 
            const userLoginData = response?.data
            console.warn('userLoginData',userLoginData)
            const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
            localStorage.setItem('accessToken', userLoginData.data.accessToken);
            localStorage.setItem('tokenExpiry', expiry.toString());
            if(userLoginData.statusCode>=200 && userLoginData.statusCode<300){
                const res = await signIn( "credentials",{
                    redirect:false,
                    username:cred?.email,
                    password:cred?.password,
                    accessToken:userLoginData.data.accessToken
                })
                setloading(false)
                if(res?.error){
                triggerAlert(res?.error, "danger")
                //   setloginError('Authentication Failed')
                }else{
                    triggerAlert("Login successfull", "success")
                    router.push('/')
                }
           }
        }catch(err){
            setloginError((err as Error).message)
            triggerAlert((err as Error).message, "danger")
            setTimeout(() => {
                setloginError('')
            }, 4000);
            setloading(false)
        }
    }
    return{
        handleSubmit,
        cred,
        loginOnChange,
        loginError,
        loading,
    }
}
export default useLogin