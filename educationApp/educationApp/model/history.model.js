module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("History", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        UserID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        AllQuestion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        TotalPoints: {
            type: Sequelize.FLOAT
        }
    });

    return History;
};