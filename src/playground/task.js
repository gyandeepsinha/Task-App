require('../db/mongoose');
const User     =  require('../db/models');

//Update Task By Id with promise chain
User.findByIdAndUpdate('62fe806e77efd0e2379c2c63').then((user) => {
    return User.countDocuments({ age : 21 })
}).then((userCount) => {
    console.log('Total User Count: '+ userCount);
}).catch((error) => {
    console.log('Error While Updating User'+ error);
});