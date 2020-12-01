const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../middlewares/Validation')


router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)       
    if(error) { return res.status(400).end(error.details[0].message.toUpperCase()) }

    const user = await User.findOne({username: req.body.username}) 
    if(user) { return res.status(400).end('User already exist.')}
       
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username.toLowerCase(),
        password: hashedPassword,
        role: req.body.role,
    })

    await newUser.save()
    res.status(200).json(newUser)

})
//--------------- BASIC LOGIN ------------------//

router.post('/login', async (req, res) => {
    const accessExpire = process.env.ACCESS_TOKEN_EXPIRES;
    const refExpire = process.env.REFRESH_TOKEN_EXPIRES;

    const { error } =  loginValidation(req.body)

    if(error) { return res.status(400).end(error.details[0].message) }
    
    const user = await User.findOne({username: req.body.username}) 
    if(!user) { return res.status(404).end('INVALID USERNAME')}

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) { return res.status(400).end('INVALID PASSWORD')}
    
    const accessToken = JWT.sign({ _id: user._id, role: user.role }, 
    process.env.SECRET_KEY, { expiresIn: accessExpire } )

    const refreshToken = JWT.sign({ _id: user._id, role: user.role }, 
    process.env.REFRESH_SECRET_KEY, { expiresIn: refExpire } )

    res.cookie('token', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken })
        
})

// ------------ AKA i dont know if this is correct ------------//
router.post('/logout', async (req, res) => { 
    res.clearCookie('refreshToken');
    res.clearCookie('token');
    return res.sendStatus(200);
})
//--------------- AKA I DONT KNOW WHAT I AM DOING ------------------//
router.post('/token',async ( req, res ) => {
    const accessExpire = process.env.ACCESS_TOKEN_EXPIRES;
    const { refreshToken } = req.cookies;
    if (!refreshToken) { return res.status(403).end('Access Denied') }
    console.log(refreshToken);

    JWT.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) { return res.sendStatus(403) }

        const accessToken = JWT.sign({ _id: user._id, role: user.role }, 
        process.env.SECRET_KEY, { expiresIn: accessExpire });
        res.cookie('token', accessToken, { httpOnly: true });
        res.status(200).json({ accessToken }); 
        
    });
})

module.exports = router
