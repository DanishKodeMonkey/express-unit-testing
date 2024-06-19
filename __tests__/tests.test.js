const index = require('../routes/index');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

test('index route works', (done) => {
    request(app)
        .get('/')
        .expect('Content-type', /json/)
        .expect({ name: 'Danish Kode Monkey' })
        .expect(200, done);
});

test('testing route works', (done) => {
    request(app)
        .post('/test')
        .type('form')
        .send({ item: 'hey' })
        .then(() => {
            request(app)
                .get('/test')
                .expect({ array: ['hey'] }, done);
        });
});
