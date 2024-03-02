const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations

const userControllers = require("./controllers/userControllers");

/* ************************************************************************* */

const { inscription, hashPassword } = require("./services/inscription");
const { alreadyInYourList } = require("./services/list");
const { verifyPassword, checkToken } = require("./services/auth");

router.get("/users/:id", userControllers.find);

// Route to add a new user
router.post("/users", inscription, hashPassword, userControllers.add);

// Route to login
router.post("/login", verifyPassword, userControllers.login);
router.get("/logout", userControllers.logout);

// Protected route behind the token
router.use(checkToken);
router.get("/admin", userControllers.admin);

router.post("/users/played/:id", alreadyInYourList, userControllers.addgame);
router.put("/users/played/:id", userControllers.update);
router.get("/users/list/:pseudo", userControllers.readAll);
router.get("/users/favorite/:pseudo", userControllers.readFavorite);

router.delete("/users/list/:gameId", userControllers.deleteFromList);
router.post("/users/game/:gameId", userControllers.checkGame);

router.get("/protected", userControllers.protectedRoute);
module.exports = router;

/* ************************************************************************* */
/*
Exemple d'utilisation : 


router.post("/users"
{
    "pseudo" : "admin",
    "email" : "admin@admin.com",
    "password": "rootroot"
}

router.post("/login"
{
    "pseudo" : "admin",
    "password : "rootroot"
}

router.post(
  "/users/played/:id"
http://localhost:3310/api/users/played/836951 lien exemple
{
    "id" : 1,
    "liked" : 1
}

router.put("/users/played/:id"
{
    "id" : 1,
    "liked" : 1,
    "rating" : 5
}

*/
/* ************************************************************************* */
