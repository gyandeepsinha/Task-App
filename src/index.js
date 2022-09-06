const express       =  require('express');
const { ObjectId }  =  require('mongodb');
require('./db/mongoose');
const userRoute     =  require('./routers/userRoute');
const taskRoute     =  require('./routers/taskRoute');

const app           =   express();
const port          =   process.env.PORT;

app.use(express.json());
app.use(userRoute, taskRoute);


// Server Configuration
app.listen(port, () => {
    console.log('Server Is Running On Port :'+ port);
});