// Dependemcies
const express = require('express');
const sequelize = require('./config/connections.js');

// Express App

const app = express();
const PORT = process.env.PORT || 3001;

// data parsing for express app
app.use(express.erlencoded({ extended: true}));
app.use(express.json());

// static directory
app.use(express.static('public'));

// Routes
app.use(require('./routes'));

// sync sequelize models and starts Express app
sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function(){
        console.log('APP listening on PORT ' + PORT);

    });
});