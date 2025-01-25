import  CredentialsProvider  from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions={
    providers:[
        CredentialsProvider({
            name:'Email',
            credentials:{
                email:{label:'Email',type:'Email',placeholder:'Your Email'},
                password:{label:'Password',type:'Password'}
            },
            async authorize(credentials:any){
                function extractProtocolAndDomain(url:URL) {
                    const parsedUrl = new URL(url);
                    const domain = parsedUrl.hostname;
                    const port = parsedUrl.port ? `:${parsedUrl.port}` : ''; // Include port if available
                    return `${parsedUrl.protocol}//${domain}${port}/`;
                }
                let url = extractProtocolAndDomain(credentials?.callbackUrl)
                const res = await axios.post(`${url}api/auth/login`,{
                      email:credentials?.username,
                      password:credentials?.password
                })                   
                const users = res.data
                if (users?.statusCode >=200 && users?.statusCode<=300) {
                    const profileRes = await axios.get(`${url}api/profile`, {
                        headers: { 
                            'Authorization': `Bearer ${users.data.key}`
                        },
                    });
                    const profile = await profileRes.data;
                    // Check if profile is valid
                    if (profile?.email === users.email) {
                        // Combine user data and profile data, including the token
                        let user = {
                            id: profile?.data?.user_id,
                            email: profile.data.email,
                            name: profile?.data.name, 
                            token: users.data.key, 
                            role:profile?.data.role ?? 'user',
                            access_token:users.data.key
                        }
                        return user;
                    } else {
                        throw new Error(profile?.message || 'Unable to fetch user profile');
                    }
                  } else {
                    throw new Error(users?.message || 'Authentication failed'); 
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
                token.access_token = user.access_token
            }
            return token
        },
        async session({session,token}:{session:any,token:any}){
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.role = token?.role;
            session.access_token = token.access_token
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