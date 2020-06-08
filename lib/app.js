const express = require('express');
const app = express();
const Shareable = require('./models/Shareable');

app.use(require('cors')());
app.use(express.json());

app.post('/shareables', (req, res) => {
    Shareable
        .create(req.body)
        .then(shareable => res.send(shareable));
});

app.get('/shareables/', (req, res) => {
    Shareable
        .find()
        .then(shareable => res.send(shareable));
});

app.delete('/shareables/:id', (req, res) => {
    Shareable
        .findByIdAndDelete(req.params.id)
        .then(shareable => res.send(shareable));
}); 

app.get('/shareables/:id', (req, res) => {
    Shareable
        .findById(req.params.id)
        .then(shareable => res.send(shareable));
});

app.patch('/shareables/:id', (req, res) => {
    Shareable 
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(shareable => res.send(shareable));
});
module.exports = app;
