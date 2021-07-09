module.exports = (sequelize, Sequelize) => {
    const CategorysChild = sequelize.define("CategorysChild", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        ParentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
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

    return CategorysChild;
};