const {MongoClient,ObjectId}  =  require('mongodb');
const databaseConnectionURL   = "mongodb://127.0.0.1:27017";
const databaseName            = "task-manager";

MongoClient.connect(databaseConnectionURL, {useNewUrlParser : true}, (error, client) =>{
    if(error){
        return console.log('Error In Establishing Database Connection!');
    }
    const db    = client.db(databaseName);
    // -----Insert Query
    // db.collection('users').insertOne({
    //     'name'  : 'Gyandeep Sharma',
    //     'age'   :  29,
    //     'Salary':  4000
    // });

    //-----Find Query
    // db.collection('users').find({name :'Gyandeep Sharma'}).toArray((error, userDetails) => {
    //     if(error){
    //         return console.log('Unable To Fetch Data!')
    //     }
    //     console.log(userDetails);
    // });

    // -----Update Query
    // db.collection('users').updateMany({name: 'Gyandeep Sharma'}, { $inc : {age : 1}
    // }).then((result) => {
    //     console.log('Document Updated Successfully!');
    // }).catch((error) => {
    //     console.log(error);
    // });

    // -----Delete Query
    db.collection('users').deleteOne({ name: 'Shaurya Sharma' 
    }).then((result) =>{
        console.log('Document Deleted Successfully!');
    }).catch((error)=>{
        console.log('Error In Deleting Document!'+ error);
    });
});