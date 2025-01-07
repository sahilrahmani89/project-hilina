import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Function to validate JWT token
export const validateToken = (token: string) => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }

        // Verify the token using your secret
        if(JWT_SECRET){
        const decoded = jwt.verify(token, JWT_SECRET!);
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
