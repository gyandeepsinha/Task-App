const express       =  require('express');
const { ObjectId }  =  require('mongodb');
require('./db/mongoose');
const userRoute     =  require('./routers/userRoute');
const taskRoute     =  require('./routers/taskRoute');

const app           =   express();

app.use(express.json());
app.use(userRoute, taskRoute);

module.exports  =   app;