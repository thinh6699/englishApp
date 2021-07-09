module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("Account", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        FullName: {
            type: Sequelize.STRING
        },
        Phone: {
            type: Sequelize.STRING
        },
        Avatar: {
            type: Sequelize.TEXT
        },
        Birthday: {
            type: Sequelize.DATE
        },
        Sex: {
            type: Sequelize.TEXT
        },
        Address: {
            type: Sequelize.STRING
        },
        Status: {
            type: Sequelize.INTEGER
        }
    });

    return Account;
};