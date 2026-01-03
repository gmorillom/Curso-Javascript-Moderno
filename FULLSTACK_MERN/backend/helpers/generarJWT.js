import jwt from "jsonwebtoken"

export default (id) => {
    const payload = {
        id,
        now: Date.now()
    }

    const options = {
        expiresIn: "1h"
    }
    
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}