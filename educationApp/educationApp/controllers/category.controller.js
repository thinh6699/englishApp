const db = require("../model");
var _ = require('lodash');
const Category = db.categorys;
const ChildCategory = db.childCategorys
const Grammar = db.grammar
exports.findAll = async (req, res) => {  //Lấy tất cả thông tin chủ đề
    try {
        var _data = await Category.findAll();
        return res.send({
            status: 200,
            message: "Tất cả chủ đề!",
            data: _data
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving categories table."
        });
    }
}

exports.findChildCategory = async (req, res) => { //Lấy thông tin chủ đề con
    try {
        var categoryID = req.params.categoryID
        if (categoryID && categoryID != '') {
            var _data = await Category.findAll({
                include: ChildCategory,
                where: { id: categoryID }
            });
            if (_data.length > 0) {
                var _categorysChildren = _data[0].CategorysChildren;
                return res.send({
                    status: 200,
                    message: "Tất cả chủ đề con!",
                    data: _categorysChildren
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving categories table."
        });
    }
}

exports.getQuestionByChildCategory = async (req, res) => { //Lấy câu hỏi theo chủ đề con
    try {
        var categoryID = req.params.childCategoryID
        if (categoryID && categoryID != '') {
            var _data = await Grammar.findAll({
                where: { ChildCategoryID: categoryID }
            });
            if (_data.length > 0 && _data.length <= 10) {
                var listQuestion = [];
                _data.forEach((question, i) => {
                    var _wrong = [];
                    if (question.WrongAnswer1 && question.WrongAnswer1 != '') {
                        _wrong.push(question.WrongAnswer1)
                    }
                    if (question.WrongAnswer2 && question.WrongAnswer2 != '') {
                        _wrong.push(question.WrongAnswer2)
                    }
                    if (question.WrongAnswer3 && question.WrongAnswer3 != '') {
                        _wrong.push(question.WrongAnswer3)
                    }
                    var _question = {
                        Stt: i + 1,
                        QuestionID: question.id,
                        QuestionNumber: `Câu ${i + 1}`,
                        Titles: question.Titles,
                        Question: question.Question,
                        RightAnswer: question.RightAnswer,
                        WrongAnswer: _wrong
                    }
                    listQuestion.push(_question);
                })
                return res.send({
                    status: 200,
                    message: "get question !",
                    data: listQuestion
                });
            } else if (_data.length > 10) {
                // get random 10 question
                var listQuestion = _.sampleSize(_data, 10);
                return res.send({
                    status: 200,
                    message: "get question !",
                    data: listQuestion
                });
            } else {
                return res.send({
                    status: 200,
                    message: "get question !",
                    data: []
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving categories table."
        });
    }
}