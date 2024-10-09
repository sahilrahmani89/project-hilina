"use client"
import React, {createContext,useContext, useMemo , Suspense} from "react";
import { usePathname } from "next/navigation";
import Navbar from "../component/header/Navbar";
import Footer from "../component/footer/Footer";

const LayoutContext = createContext({hideNavbarFooter:false})

export const LayoutProvider = ({children}:{children:any}) =>{
    const pathname = usePathname();
    //
    const paths = ['/login','/signup']
    //
    const hideNavbarFooter = useMemo(()=>{
        return paths.includes(pathname)
    },[pathname])
    //
    return(
        <LayoutContext.Provider value={{hideNavbarFooter}}>
            <Suspense fallback={<h1>Loading...</h1>}>
            {!hideNavbarFooter && <Navbar/> }
              {children}
            {!hideNavbarFooter && <Footer/>}
            </Suspense>
        </LayoutContext.Provider>
    )
}

export const useLayout = () => useContext(LayoutContext);