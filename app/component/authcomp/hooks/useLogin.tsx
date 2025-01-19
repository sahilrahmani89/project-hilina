"use client"
import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { alert } from "@/app/reuse-type/alert.type";

const useLogin = ({useAlert}:{useAlert:any}) =>{
    const triggerAlert = useAlert()
    const [cred,setcred] = useState({email:'',password:''})
    const [loginError,setloginError] = useState('')
    const router = useRouter()
    const [alert,setalert] = useState<alert>({isAlert:false,message:'',type:''})
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
        console.log('hhffhfj')
        try{
            const res = await signIn( "credentials",{
                redirect:false,
                username:cred?.email,
                password:cred?.password
            })
            if(res?.error){
              triggerAlert(res?.error, "danger")
            //   setloginError('Authentication Failed')
            }else{
                triggerAlert("Login successfull", "success")
                router.push('/')
            }
        }catch(err){
            setloginError((err as Error).message)
            triggerAlert((err as Error).message, "danger")
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
        alert,
    }
}
export default useLogin