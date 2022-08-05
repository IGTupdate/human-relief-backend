import express from "express";
import {getUser, getProfile, userRegister, deleteUser, editUser, searchUser,userLogin,uniqueUser, userList} from '../controller/user-controller.js'

import jwt from 'jsonwebtoken';
const jwtkey = "jwt";
const router = express.Router();

const tokenVerify = (req,res,next) =>{
    const bearerHeader = req.headers['authorization']; 
    const status = false;
    if(typeof bearerHeader !== "undefined"){
     const bearer = bearerHeader.split(' ');
       jwt.token = bearer[1];

       jwt.verify(jwt.token,jwtkey,(err,authData)=>{
            if(err){
                    res.json({result:err});
            }else{
                    next();
            } 
       })
            
    }else{
            res.status(404).json({"Result":"Token not provided"}) 
    }
}


router.get('/',getUser);
router.post('/userList',tokenVerify,userList);
router.post('/register',userRegister);
router.delete('/delete/:id', deleteUser);
router.put('/users/update/:_id', editUser); 
router.get('/users/search/:key',searchUser);
router.get('/users/profile/:id',getProfile);
router.post('/login',userLogin);  
router.get('/users/unique/:email',uniqueUser);  

export default router; 