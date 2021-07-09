const db = require("../model"); // Check điều kiện đăng ký
const User = db.account;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(user => {
        if (user) {
            res.status(202).send({
                message: "Lỗi! Email đã có người sử dụng"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
