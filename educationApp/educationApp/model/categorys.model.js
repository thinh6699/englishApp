module.exports = (sequelize, Sequelize) => {
    const Categorys = sequelize.define("Categorys", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        CategoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING
        },
        Image: {
            type: Sequelize.STRING
        }
    });

    return Categorys;
};