import jwt from 'jsonwebtoken'

export function createToken(param: string, role: string){
    if(role==="user"){
        const token= jwt.sign(
            {
                param: param,
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

