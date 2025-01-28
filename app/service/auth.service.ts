import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRE = '10m';
const REFRESH_TOKEN_EXPIRE = '30d';

if (!JWT_SECRET) {
    throw new Error('JWT Secret not found!');
}

export function generateAccessToken(token: string): string {
    if (!token) throw new Error('Token is required');
    if(JWT_SECRET){
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        const { id, email } = decoded;
        return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
    }else{
        throw new Error('JWT_SECRET Required')
    }
}

export function generateRefreshToken(id: string, email: string): string {
    if (!id || !email) throw new Error('Both fields are required');
    if(JWT_SECRET){
        return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
    }else{
        throw new Error('JWT_SECRET Required')
    }
}
