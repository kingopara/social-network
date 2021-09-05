const express = require('express');
const mongoose = require('mongoose');

//express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
app.use(require('./routes'));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries being executed
mongoose.set('debug', true);

//server
app.listen(PORT, () => console.log(`🌍 connected to localhost ${PORT}`));