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
const { verifyPassword, verifyToken, checkToken } = require("./services/auth");

router.get("/users/:id", userControllers.find);

// Route to add a new user
router.post("/users", inscription, hashPassword, userControllers.add);
/* {
    "pseudo" : "admin",
    "email" : "admin@admin.com",
    "password": "rootroot"
} */

// Route to login
router.post("/login", verifyPassword, userControllers.login);
/* {
    "pseudo" : "admin",
    "password": "rootroot"
} */
router.get("/logout", userControllers.logout);
router.get("/admin", verifyToken, userControllers.admin);

router.post("/users/played/:id", alreadyInYourList, userControllers.addgame);
/* http://localhost:3310/api/users/played/836951 lien exemple
{
    "id" : 1,
    "liked" : 1
} */
router.put("/users/played/:id", userControllers.update);
/*
{
    "id" : 1,
    "liked" : 1,
    "rating" : 5
}
*/

router.get("/users/list/:pseudo", userControllers.readAll);
// http://localhost:3310/api/users/list/pseudo
router.get("/users/favorite/:pseudo", userControllers.readFavorite);

router.delete("/users/list/:gameId", userControllers.deleteFromList);
router.post("/users/game/:gameId", userControllers.checkGame);

router.get("/protected", checkToken, userControllers.protectedRoute);
module.exports = router;
