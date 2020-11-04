const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/shareables', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(3000, () => {
    console.log('started on 3000');
});
