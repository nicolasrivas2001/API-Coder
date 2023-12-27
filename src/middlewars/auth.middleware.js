export const authMiddleware = (roles) => {
    return(req,res,next) => {
        const user = req.user
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        if(!roles.includes(user.user.role)){
            return res.status(403).json({message:"Unauthorized"})
        }
        next()
    }
}