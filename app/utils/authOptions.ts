import  CredentialsProvider  from 'next-auth/providers/credentials'

export const authOptions={
    providers:[
        CredentialsProvider({
            name:'Email',
            credentials:{
                email:{label:'Email',type:'Email',placeholder:'Your Email'},
                password:{label:'Password',type:'Password'}
            },
            async authorize(credentials){
                console.log('authorize boom baam')
                console.log('credentials',credentials)
                const res = await fetch('/api/auth/login',{
                    method:'POST',
                    body:JSON.stringify({
                      username:credentials?.email,
                      password:credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (user?.ok && user) {
                    const profileRes = await fetch('/api/auth/profile', {
                        method: 'GET',
                        headers: { 
                            'Authorization': `Bearer ${user.token}`
                        },
                    });
                    const profile = await profileRes.json();
                    // Check if profile is valid
                    if (profile?.ok && profile) {
                        // Combine user data and profile data, including the token
                        return {
                            id: user.user_id,
                            email: user.email,
                            name: profile.name, 
                            role: profile.role, 
                            token: user.token, 
                        };
                    } else {
                        // If profile fetching fails, throw an error
                        throw new Error(profile?.message || 'Unable to fetch user profile');
                    }
                  } else {
                    throw new Error(user?.message || 'Authentication failed'); 
                }
            }
       })
    ],
    session:{
        strategy:'jwt' as const
    },
    callbacks:{
        async jwt({token,user}:{token:any,user:any}){
            if(user){
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        async session({session,token}:{session:any,token:any}){
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        },
    },
    secret:process.env.NEXTAUTH_SECRET,
}