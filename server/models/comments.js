module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        comment_body : {
            type : DataTypes.STRING,
            allowNull: false
        }
    })

    return comments
}