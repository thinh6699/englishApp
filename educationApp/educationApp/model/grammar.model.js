module.exports = (sequelize, Sequelize) => {
    const Grammar = sequelize.define("Grammars", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        ChildCategoryID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Titles: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Question: {
            type: Sequelize.STRING
        },
        WrongAnswer1: {
            type: Sequelize.STRING
        },
        WrongAnswer2: {
            type: Sequelize.STRING
        },
        WrongAnswer3: {
            type: Sequelize.STRING
        },
        RightAnswer: {
            type: Sequelize.STRING
        }
    });

    return Grammar;
};