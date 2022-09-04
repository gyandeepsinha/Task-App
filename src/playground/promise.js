require('../db/mongoose');
const {User, task}     =  require('../db/models');

//Upddate User By Id with promise chain
User.findByIdAndUpdate('62fe806e77efd0e2379c2c63').then((user) => {
    return User.countDocuments({ age : 21 })
}).then((userCount) => {
    console.log('Total User Count: '+ userCount);
}).catch((error) => {
    console.log('Error While Updating User'+ error);
});

// const updateUserById    = async (id) => {
//     const updatedUser   = await User.findByIdAndUpdate(id);
//     return updatedUser;
// }

// updateUserById('62fe806e77efd0e2379c2c63').then((updatedUser) => {
//     console.log('updatedUser :'+ updatedUser);
// }).catch((error) => {
//     console.log('Error While Updatind user'+ error);
// });

//Update Task By Id with promise chain
// task.findByIdAndUpdate('62fe5afe442868644598df1a', {status : true }).then((task) => {
//     return task.countDocuments({ status : false })
// }).then((taskCount) => {
//     console.log('Total Task Count :'+ taskCount);
// }).catch((error) => {
//     console.log(error);
// });

