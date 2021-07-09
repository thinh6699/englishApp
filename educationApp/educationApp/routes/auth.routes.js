const { verifySignUp } = require("../middleware");

const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
        next();
    });

    app.post("/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/reset", controller.reset);

    app.post("/api/auth/updatepass", controller.updatePassword);

    app.get("/api/accountinfo/:accountID", controller.getInfoAcount);

    app.put("/api/account/:accountID", controller.update);

};