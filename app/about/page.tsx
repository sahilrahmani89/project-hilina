import { getServerSession } from "next-auth"
import { authOptions } from "../utils/authOptions"
import About from "../component/about/About"
export default async function Home(){
    // const session = await getServerSession(authOptions)
    // console.warn('session',session)
    return(
        <>
         <About/> 
        </>
    )
}