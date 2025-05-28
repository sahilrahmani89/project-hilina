import { Suspense } from "react";
import BlogPostForm from "../component/story/CStory";

export default function Home(){
    return(
        <Suspense fallback={<p style={{fontSize:'60px',color:'red'}}>Loading...</p>}>
          <BlogPostForm/>
        </Suspense>
    )
}