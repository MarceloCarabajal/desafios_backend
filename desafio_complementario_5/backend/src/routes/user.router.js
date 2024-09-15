import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import { checkAuth } from "../middlewares/authJwt.js";
import passport from "passport";
import { checkAdmin, checkAdminOrPremium } from "../middlewares/checkRoleJwt.js";

const router = Router();

router.post("/register", controller.register);

router.post('/login', controller.login);

router.get("/current", [checkAuth, checkAdminOrPremium], controller.current);

router.post("/logout", [checkAuth], controller.logout);

//agregar boton de restablecer
router.post("/reset-pass", checkAuth, controller.generateResetPassword);

router.put("/new-pass", checkAuth, controller.updatePassword);

router.put("/premium/:uid", [checkAuth], controller.togglePremiumRole);

router.put('/inactive', [checkAuth, checkAdmin], controller.checkUsersLastConnection);

//---------------------------------------------------------------------------------------------------

//Github Passport
router.get("/register-github", passport.authenticate('github', { scope: [ 'user:email ' ] }));

router.get("/profile-github", passport.authenticate('github', {
    failureRedirect: '/views/login',
    successRedirect: '/views/profile-github',
    passReqToCallback: true
}));

//Github sin vistas
//router.get("/profile", passport.authenticate('github', { scope: [ 'user:email' ]}), controller.githubResponse); 

//---------------------------------------------------------------------------------------------------

//Google Passport
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
    failureRedirect: '/views/login',
    successRedirect: '/views/profile',
    passReqToCallback: true
    })
);

//---------------------------------------------------------------------------------------------------


//Test
router.get('/private', checkAuth, (req, res) => res.json({ user: req.user}));

//router.get('/private', passport.authenticate('jwt'), (req, res) => res.json({ user: req.user}));

//---------------------------------------------------------------------------------------------------


router.get('*', (req, res) => {
    //await services.getByEmail(email) ......
    res.send('Ruta inexistente');
});


export default router;