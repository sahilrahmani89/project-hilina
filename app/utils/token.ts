import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
interface DecodedToken extends JwtPayload {
    id: string;
  }

// Function to validate JWT token
export const validateToken = (token: string): DecodedToken | null  => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }

        // Verify the token using your secret
        if(JWT_SECRET){
        const decoded = jwt.verify(token, JWT_SECRET!)  as DecodedToken;
        return decoded;

        }
        else{
            throw new Error('JWT Secret Error')
        }
        // Return decoded data (e.g., user info)
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
