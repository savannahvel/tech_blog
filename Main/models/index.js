const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

// user has many posts
Users.hasMany(Posts, {
    foreignKey: 'author_id'
})

// posts belong to users
Posts.belongsTo(Users, {
    foreignKey: 'author_id'
})

// posts has many comments
Posts.hasMany(Comments, {
    foreignKey: 'post_id'
})

// comments belongs to posts
Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
})

module.exports = {
    Users,
    Posts,
    Comments,
};