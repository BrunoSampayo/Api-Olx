import { Router } from "express";
import * as AuthController from '../controllers/AuthController';
import * as UserController from '../controllers/UserController';
import * as AdsController from '../controllers/AdsController';

const router = Router();

router.get('/ping',(req,res)=>{
    res.json({pong:true})
});

router.get('/states',UserController.getStates); //Get all states registered

router.get('/user/signin', AuthController.signIn); //Login method
router.get('/user/signup', AuthController.signUp); //Register method

router.get('/user/me', UserController.info); //Get User info
router.put('/user/me', UserController.editAction); //Edit User info

router.get('/categories', AdsController.getCategories); //Get all categories from ads

router.post('/ad/add', AdsController.addAction); //Add an ad
router.get('ad/list', AdsController.getList); // Get a list ads
router.get('/ad/item',AdsController.getItem); // Get a single ad
router.post('/ad/:id', AdsController.editAction); //Edit an ad

export default router;