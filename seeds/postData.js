const { Post } = require('../models')

const postData = [
    {
        title: 'Post 1',
        contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac semper ex. Maecenas quis condimentum elit. Sed suscipit, libero vel lacinia laoreet, odio ante tincidunt ante, venenatis dignissim est lectus in metus. Sed aliquam tellus neque, fringilla luctus magna vestibulum eu. Cras fermentum nibh nunc, quis faucibus lorem scelerisque at. Pellentesque laoreet est ultricies nunc elementum, vel rutrum neque ullamcorper.',
        date: 'October 1, 2021',
        // user_id: '1'
    },
    {
        title: 'Post 2',
        contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac semper ex. Maecenas quis condimentum elit. Sed suscipit, libero vel lacinia laoreet, odio ante tincidunt ante, venenatis dignissim est lectus in metus. Sed aliquam tellus neque, fringilla luctus magna vestibulum eu. Cras fermentum nibh nunc, quis faucibus lorem scelerisque at. Pellentesque laoreet est ultricies nunc elementum, vel rutrum neque ullamcorper.',
        date: 'October 2, 2020',
        // user_id: '1'
    },
    {
        title: 'Post 3',
        contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac semper ex. Maecenas quis condimentum elit. Sed suscipit, libero vel lacinia laoreet, odio ante tincidunt ante, venenatis dignissim est lectus in metus. Sed aliquam tellus neque, fringilla luctus magna vestibulum eu. Cras fermentum nibh nunc, quis faucibus lorem scelerisque at. Pellentesque laoreet est ultricies nunc elementum, vel rutrum neque ullamcorper.',
        date: 'June 1, 2019',
        // user_id: '1'
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;