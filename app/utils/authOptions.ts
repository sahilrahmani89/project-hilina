import  CredentialsProvider  from 'next-auth/providers/credentials'
import axios from 'axios'
import { extractProtocolAndDomain } from './common'

export const authOptions={
    providers:[
        CredentialsProvider({
            name:'Email',
            credentials:{
                email:{label:'Email',type:'Email',placeholder:'Your Email'},
                password:{label:'Password',type:'Password'}
            },
            async authorize(credentials:any){
                let url = extractProtocolAndDomain(credentials?.callbackUrl)     
                const {accessToken} = credentials || {}
                try{
                    const profileRes = await axios.get(`${url}api/profile`, {
                        headers: { 
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });
                    const profile = await profileRes.data;
                        let user = {
                            id: profile?.data?.user_id,
                            email: profile.data.email,
                            name: profile?.data.name, 
                            role:profile?.data.role ?? 'user',
                        }
                        return user;
                    }catch(err){
                        throw new Error('Something went wrong while fetching profile')
                    }
            }
       })
    ],
    // session: { strategy:'any'},
    callbacks:{
        async jwt({token,user}:{token:any,user:any}){
            if(user){
                token.id = user.id
                token.email = user.email
                token.role = user.role
                token.fullName= user.name
            }
            return token
        },
        async session({session,token}:{session:any,token:any}){
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.role = token?.role;
            return session;
        },
        async signIn(params:any){
            return true
        }
    },
    pages:{
        signIn:"/login",
        // signOut:'/',
        // error:'/error',
        // newUser:'/signup'
    },
    secret:process.env.NEXTAUTH_SECRET,
}