const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config')

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json({limit: '200mb'}))
app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/image', require('./routes/data.router'))


const run = async () => {
    try {
        await mongoose.connect(config.get("mongo"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`>>>Server is running on port ${PORT}`));
    } catch (e) {
        console.log("This error occured during the attempt to run the server: ", e.message);
        process.exit(1);
    }
}

run();
