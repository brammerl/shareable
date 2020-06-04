const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../app');
const Shareable = require('../models/Shareable');

describe('app routes', () => {
    const mongo = new MongoMemoryServer();
    beforeAll(() => {
        return mongo.getUri()
            .then(uri => mongoose.connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a new shareable', () => {
        return request(app)
            .post('/shareables')
            .send({
                url: `http://testsite.com`,
                description: 'test description'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    url: 'http://testsite.com',
                    description: 'test description',
                    likes: 0,
                    __v: 0
                });
            });
    });
});
