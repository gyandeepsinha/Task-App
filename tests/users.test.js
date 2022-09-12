const request   =   require('supertest');
const app       =   require('../src/app');

// signUp User test
test('Should signup User', async() => {
    await request(app).post('/addUser').send({
        name       : "Komal Choudhary",
        email      : "komal@gmail.com",
        password   : "123456789",
        age        : 20
    }).expect(201);
});
// User login test
test('Should login user', async() => {
    await request(app).post('/users/login').send({
        email       : "shaurya@gmail.com",
        password    : "123456789"
    }).expect(200);
});
// Non-existent user test
test('Should error for non-existent user', async() =>{
    await request(app).post('/users/login').send({
        email       :  "shaurya@gmail.com",
        password    : "thisisnotmypass"
    }).expect(404);
});
// Get user profile with Authentication
test('should pass authentication user', async() => {
    await request(app)
    .get('/getUsersById/631df44625cb44d8a6d726fe')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzExOWRmODQ5MWJmODZmMmQ3YjNjYmQiLCJpYXQiOjE2NjI5MDg5NzN9.q-BeHP58YVh-UPaUsbU7Rh662qhCcAZAo2PJDULJC0w')
    .send()
    .expect(400)
});
