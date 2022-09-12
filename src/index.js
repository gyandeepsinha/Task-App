const app           =   require('./app');
const port          =   process.env.PORT;

// Server Configuration
app.listen(port, () => {
    console.log('Server Is Running On Port :'+ port);
});