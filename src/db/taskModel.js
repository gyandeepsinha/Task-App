const mongoose  =   require('mongoose');
// const mongoose  =   require('mongoose-test');

// Task Collection Schema
const taskSchema    =   mongoose.Schema({
    task    :   {
        type: String,  
        required: true
    },
    status  :   {
        type: Boolean, 
        default: false
    },
    owner   :   {
        type: mongoose.Schema.Types.ObjectId, 
        required : true,
        ref : 'User'
    }
},{
    timestamps  :   true
});
// Task Collection Schema
const task  =   mongoose.model('task', taskSchema);

module.exports  = { task };