import { getServerSession } from "next-auth"
import { authOptions } from "../utils/authOptions"
export default async function Home(){
    const session = await getServerSession(authOptions)
    console.warn('session',session)
    return(
        <>
            <p>About page Illey</p>
            
        </>
    )
}