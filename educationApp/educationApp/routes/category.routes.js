
const category = require('../controllers/category.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
        next();
    });
    app.get("/api/category", category.findAll);

    app.get("/api/childcategory/:categoryID", category.findChildCategory);

    app.get("/api/question/:childCategoryID", category.getQuestionByChildCategory);
}