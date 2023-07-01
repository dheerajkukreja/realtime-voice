//const User = require("../model/userModel")
//const bcrypt = require("bcrypt")

const otpService = require('../services/otp-service') 
const hashService = require('../services/hash-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dto/user-dto')
const Jimp = require('jimp')
const path = require('path')

module.exports.sendOtp = async(req, res, next) =>{
    const {phone} = req.body

    if(!phone){
        return res.status(400).json({msg: "Phone field is required", status:false})
    }
    const otp = await otpService.generateOtp()


    const ttl = 1000 * 60 * 2;

    const expires = Date.now() + ttl

    const data = `${phone}.${otp}.${expires}`


    const hash = hashService.hashOtp(data)

    //sendOtp
    try{
        //await otpService.sendBySms(phone, otp)
        res.json({
            hash:`${hash}.${expires}`,
            otp,
            phone
        })
    }catch(err){
        res.status(500).json({message:err})
    }
}


module.exports.verifyOtp = async (req, res, next) => {
    const {otp, hash, phone} = req.body

    if(!otp || !hash || !phone){
        return res.status(400).json({
            msg:"Some Fields are empty",
            status:false
        })
    }

    const [hashedOtp, expires] = hash.split('.')
    if(Date.now() > +expires){
        return res.status(400).json({
            msg:"Otp Expired",
            status:false
        })
    }

    const data = `${phone}.${otp}.${expires}`

    const computedhash = hashService.hashOtp(data)

    const isValid = otpService.verifyotp(hashedOtp, computedhash)
    if(!isValid){
        return res.status(400).json({
            msg:"Invalid Otp",
            status:false
        })
    }
    let user;
    try{
        user = await userService.findUser({phone})
        if(!user){
            user = await userService.createUser({phone})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:err,
            status:false
        })
    }
    //
    const {accesstoken, refreshtoken} = tokenService.generateTokens({_id:user._id, activated:false})

    await tokenService.storeRefreshToken(refreshtoken, user._id)
    
    res.cookie('refreshToken', refreshtoken, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly:true
    })
    res.cookie('accessToken', accesstoken, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly:true
    })
    
    const userDto = new UserDto(user)
    
    res.status(200).json({accesstoken, user : userDto})
}




module.exports.activate = async (req, res) => {
        const {name, avatar} = req.body
        
        if(!name || !avatar){
            return res.status(400).json({status:false, msg:"All Fields are required..."})    
        }

        // Image Bse64 convert it to 
        const buffer = Buffer.from(
            avatar.replace(/^data:image\/jpeg;base64,/, ''), 'base64'
        )
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        
        //try saving the image in folder
        try {
            const jimResp = await Jimp.read(buffer)
            jimResp.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))
        }catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Could not process the image' });
        }

        //update user status to true
        const userId = req.user._id
        
        try {
            const user = await userService.findUser({_id:userId})
            if(!user){
                return res.status(400).json({status:false, msg:"User not found!"})
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save();
            return res.json({ user: new UserDto(user), auth: true });
        }catch (err) {
            return res.status(500).json({ message: 'Something went wrong!' });
        }
    
}





module.exports.refresh = async (req, res, next) => {
    
        
    //check if token is valid
    //check if token is in db
    //generate new token

    const {refreshToken: refreshTokenFromCookie} = req.cookies
    
    let userData
    try{
        userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        
    }catch(err){
        return res.status(401).json({
            status:false,
            msg: 'Invalid Tokenns'
        })
    }
    try{    
        const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie)
        if(!token){
            return res.status(401).json({
                status:false,
                msg: 'Invalid Tokens'
            })    
        }
    }catch(err){
        return res.status(500).json({
            status:false,
            msg: 'Internal eror'
        })
    }

    const user = await userService.findUser({ _id: userData._id})
    if(!user){
        return res.status(400).json({
            status:false,
            msg: 'User Not Found'
        }) 
    }
    const {accesstoken, refreshtoken} = await tokenService.generateTokens({_id:userData._id, activated:false})
    //update token in db
    try{
        await tokenService.updateToken(userData._id, refreshtoken)
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            msg: 'Internal error'
        })
    }
    
    res.cookie('refreshToken', refreshtoken, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly:true
    })
    res.cookie('accessToken', accesstoken, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly:true
    })
    const userDto = new UserDto(user)
    res.status(200).json({accesstoken, user : userDto})

}

module.exports.logOut = async (req, res, next)=>{
    //delete refreshToken
        const {refreshToken} = req.cookies
        tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        res.status(200).json({user:null, auth:false})
    //delete cookies
}