const db = require("../model");
// const config = require("../config/auth.config");
// var generator = require('generate-password');
const Account = db.account;

var bcrypt = require("bcryptjs");

exports.signup = (req, res) => { // Api đăng ký
    var pw = req.body.Password;

    if (pw.length < 8 || pw.length > 30) {
        return res.send({
            status: 203,
            message: "Độ dài password phải từ 8 -> 30 ký tự !"
        });
    } else {
        Account.create({
            Email: req.body.Email,
            Status: "1",
            Password: bcrypt.hashSync(req.body.Password, 8)
        }).then(account => {
            res.send({
                status: 200,
                message: "Đăng ký thành công!",
                data: account
            });
        })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }

}


exports.reset = async (req, res) => { //Api reset mật khẩu khi quên
    try {
        const email = req.body.Email;
        var acc = await Account.findOne({
            where: {
                Email: email
            }
        })
        
        if (acc.Email && acc.Email != '') {
            await acc.update({ Password: bcrypt.hashSync("123456789", 9) });
          
            return res.send({
                status: 200,
                message: "Reset mật khẩu thành công"
            });
        } else {
            return res.send({
                status: 201,
                message: "Không tìm thấy Email"
            });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.signin = (req, res) => { //Api đăng nhập
    Account.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(account => {
        if (!account) {
            return res.send({
                status: 404,
                message: "Không tìm thấy tài khoản",
                data: ""
            });
        }
        if (account.Status != 1) {
            return res.send({
                status: 404,
                message: "Tài khoản đã bị khóa",
                data: ""
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.Password,
            account.Password
        );

        if (!passwordIsValid) {
            return res.send({
                status: 401,
                message: "Mật khẩu không đúng",
                data: ""
            });
        }

        return res.send({
            status: 200,
            message: "Đăng nhập thành công!",
            data: {
                id: account.id,
                Email: account.Email,
                FullName: account.FullName,
                Phone: account.Phone,
                Status: account.Status,
                Avatar: account.Avatar,
                Birthday: account.Birthday,
                Sex: account.Sex,
                Address: account.Address,
               
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
exports.updatePassword = async (req, res) => { //Api đổi mật khẩu
    try {
        const { Email, oldPassword, newPassword } = req.body;
        var ac = await Account.findOne({ Email: Email });
        if (newPassword.length < 8 || newPassword.length > 30) {
            return res.send({
                status: 203,
                message: "Độ dài password phải từ 8 -> 30 ký tự !"
            });
        } else {
            if(ac){
            var passwordIsValid = bcrypt.compareSync(
                oldPassword, ac.Password
            );
            if (passwordIsValid) {
                await Account.update({ Email: Email, Password: bcrypt.hashSync(newPassword, 9) }, {
                    where: {
                        Email: Email
                    }
                })
                res.send({
                    status: 200,
                    message: "Cập nhật thành công."
    
            });
            } else {
                res.send({
                    status: 201,
                    message: "Sai mật khẩu"
                });
            }
        }
        else {
            res.send({
                status: 202,
                message: "Email không đúng"

            })
        }
    }
    } catch (error) {
        res.status(500).send({
            message: "Error updating Account with id=" + id
        });
    }
};
exports.getInfoAcount = (req, res) => { //Lấy thông tin tài khoản
    const _id = req.params.accountID;
    Account.findByPk(_id).then(account => {
        res.send({
            status: 200,
            message: "Thành công",
            data: account
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Lấy thông tin tài khoản thất bại"
        });
    });
}

exports.update = (req, res) => { //Update thông tin
    try {
        const id = req.params.accountID;
        const account = { FullName, Address, Phone, Sex, Birthday, Avatar, Status } = req.body;
        Account.update(account, {
            where: { id: id }
        }).then(account => {
            res.send({
                status: 200,
                message: "Cập nhật thành công"
            });
        })
    } catch (error) {
        res.status(500).send({
            message: "Error updating Account with id=" + id
        });
    }
};
