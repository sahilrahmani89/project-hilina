"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Status} from "./reuse-type/status.type";
import Button from "./component/forms/Button";
import HeroSection from "./component/home/HeroSection";
import FeaturedDestinations from "./component/home/FeaturedDestinations";
import Categories from "./component/home/Categories";
import TopCities from "./component/home/TopCities";
import StateHighlights from "./component/home/StateHighlights";
import Testimonials from "./component/home/Testimonials";
import Newsletter from "./component/home/Newsletter";


export default function Home() {
  const {data:activeSession,status} = useSession();
  let currentStatus:Status = status
  async function logout() {
    await signOut({ callbackUrl: '/login', redirect: true }); 
  }
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        {
          activeSession ? <Button onClick={logout} loading={currentStatus === 'loading'}>
                Logout
          </Button> : 
               <Link href={'/login'} className="w-full">
                  <Button loading={currentStatus === 'loading'}>Login</Button>
               </Link>
        }
      <HeroSection />
      <FeaturedDestinations />
      <Categories />
      <TopCities />
      <StateHighlights />
      <Newsletter />
      <Testimonials />
        
      </main>
    </div>
  );
}
