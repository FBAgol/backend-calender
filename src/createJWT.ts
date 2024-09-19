import jwt from 'jsonwebtoken'

export function     createToken(userid: string | undefined, role: string){
    if(role==="user"){
        const token= jwt.sign(
            {
                userId: userid, 
                roles: [role],
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );

        return token
    }
    
}

