const express = require('express');
const dotenv = require('dotenv');

const app = express()
const PORT = process.env.PORT || 3000

app.use(function (req, res, next) {
    var origins = [
        'http://localhost:1234',
    ];

    for(var i = 0; i < origins.length; i++){
        var origin = origins[i];

        if(req.headers.origin.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});

//  * Load config file
dotenv.config({ path: './config/config.env' })

//  * Middleware
app.use(express.json())

// *Route
app.use('/api', require('./route/index'))

app.listen(PORT, () => console.log(`Server is working on ${PORT}`))
