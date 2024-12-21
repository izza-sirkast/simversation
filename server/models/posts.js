module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
        title : {
            type : DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        username : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })

    posts.associate = models => {
        posts.hasMany(models.comments, {
            onDelete: 'cascade'
        })
    }

    return posts
}