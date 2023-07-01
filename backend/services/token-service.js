const jwt = require('jsonwebtoken');
const refreshModel = require('../models/refresh-model');

const accessTokenSecret  = process.env.SECRET_KEY
const refreshTokenSecret  = process.env.REFRESH_KEY

class TokenService{

    generateTokens = (payload) =>{
        const accesstoken= jwt.sign(payload, accessTokenSecret, {
            expiresIn : '1h'
        });
        const refreshtoken= jwt.sign(payload, refreshTokenSecret, {
            expiresIn : '1y'
        });
        return {accesstoken, refreshtoken}
    }
    storeRefreshToken = async (token, userId) =>{
        try{    
            await refreshModel.create({
                token: token,
                user_id: userId
            })

        }catch(err){
            console.log(err)
        }
    }

    verifyAccessToken = async(token) => {
        return jwt.verify(token, accessTokenSecret)
    }

    verifyRefreshToken = async(refreshToken) =>{
        return jwt.verify(refreshToken, refreshTokenSecret)
    }

    findRefreshToken = async (userId, refreshToken) =>{
        return await refreshModel.findOne({user_id:userId, token: refreshToken})
    }

    updateToken = async (userId, refreshToken) =>{
        return await refreshModel.updateOne({
            user_id:userId
        },{
            token: refreshToken
        })
    }
    removeToken = async(refreshToken)=>{
        return await refreshModel.deleteOne({
            token:refreshToken
        })
    }


}

module.exports = new TokenService()