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
                title: 'test title',
                description: 'test description'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    title: 'test title',
                    description: 'test description',
                    likes: 0,
                    __v: 0
                });
            });
    });

    it('gets the list of shareables', async() => {

        await Shareable.create({
            title: 'test title',
            description: 'tester description'
        });

        return request(app)
            .get('/shareables')
            .then(res => {
                expect(res.body).toEqual([
                    {
                        _id: expect.anything(),
                        title: 'test title',
                        description: 'tester description',
                        likes: 0,
                        __v: 0
                    }
                ]);
            });
    });

    it('deletes individual title', async() => {

        const newBook = await Shareable.create({
            title: 'test title',
            description: 'tester description'
        });

        return request(app)
            .delete(`/shareables/${newBook._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: newBook.id,
                    title: 'test title',
                    description: 'tester description',
                    likes: 0,
                    __v: 0
                });
            });
    });

    it('get individual title', async() => {

        const newBook = await Shareable.create({
            title: 'test title',
            description: 'tester description'
        });

        return request(app)
            .get(`/shareables/${newBook._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: newBook.id,
                    title: 'test title',
                    description: 'tester description',
                    likes: 0,
                    __v: 0
                });
            });
    });

    it('updates individual title', async() => {

        const newBook = await Shareable.create({
            title: 'test title',
            description: 'tester description'
        });

        const update = {
            title: 'new title',
            description: 'new description'
        };

        return request(app)
            .patch(`/shareables/${newBook._id}`)
            .send(update)
            .then(res => {
                expect(res.body).toEqual({
                    _id: newBook.id,
                    title: 'new title',
                    description: 'new description',
                    likes: 0,
                    __v: 0
                });
            });
    });

});

