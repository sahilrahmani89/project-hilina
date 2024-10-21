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
                return null
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