const {Post} = require('./post.js');
const {Tag} = require('./tag.js');

Post.belongsToMany(Tag, {through: 'Post_Tag'});
Tag.belongsToMany(Post, {through: 'Post_Tag'});

module.exports = {Post, Tag}