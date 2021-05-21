const express =  require('express');
const bcryptjs =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {User} = require('../models/user');


/* login , register */


router.post('/api/auth/login' , async (req, res) => {
    
    try {
        let body = req.body;

        let foundUser =  await User.findOne({email : body.email});
        if (!foundUser) {
            return res.status(400).json({message: "Email Not Found"});
        }

        /* password match */
        let isMatched = bcryptjs.compareSync(body.password , foundUser.password);
        if (!isMatched) {
            return res.status(400).json({message: "Wrong Password"});
        }

        let jwtToken = generateJWT(foundUser);

        return res
            .status(200)
              .json({
                message: "Logged In Successfully",
                token: jwtToken,
                user: foundUser,
              });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'})
    }

    
});


router.post('/api/auth/register' , async (req, res) => {
    try {
        let body = req.body;

       
        /* check if email already exist */
        let isEmailAlreadyExist = await User.findOne({email : body.email });
        if (isEmailAlreadyExist) {
           return res.status(400).json({message: 'Email Already Exist'});
        } else {
            // email not exist the create user
            // password hash
            let hash = bcryptjs.hashSync(body.password , bcryptjs.genSaltSync(10));
            body.password = hash;

            console.log(body)
            // user create
            let result = await User.create(body);
            let jwtToken =  generateJWT(result);
            console.log(jwtToken);
            return res
              .status(201)
              .json({
                message: "Account Created",
                token: jwtToken,
                user: result,
              });
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'})
    }
});


let generateJWT = (user) => {
    const token = jwt.sign(
        {
        id: user._id,
        email: user.email,
        name: user.name,
    },
    "itIsMySecretKeyDEV#Secret#Agent$$$$", // our secret key
    { expiresIn: "16h" }
    
    );
    return token;
  }


module.exports.authRouter = router;


