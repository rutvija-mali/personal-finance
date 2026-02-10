import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'


export const register = async(req, res, next)=>{
  try {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email}) 

    if(existingUser) return res.status(500).json({message:"User already exists"})
    
    const hashedPassword =   bcrypt.hash(password);
    const newUser = await User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save()

    return res.status(201).json({message:'User created successfuly'})
    
  } catch (error) {
     next(error)
  }
}

export const login = async (req, res, next)=>{
  try {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(!existingUser) return res.status(404).json({message:"Invalid credentials"})
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if(! isPasswordCorrect) return res.status(401).json({message:'Invalid credentials'})
    
    const token = jwt.sign({
        id: existingUser._id,
        name: existingUser.name,
        email:existingUser.email
    }, process.env.JWT_SECRET,{expiresIn:'3hr'})

    res.cookie({
        httpOnly:true,
        secure:true,
        sameSite: 'none',
        maxAge: 3*60*60*1000
    })
    return res.status(200).json({message:'User logged in successfully',token})

  } catch (error) {
    next(error)
  }
}