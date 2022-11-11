const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs:60*1000,
    max:4
});

module.exports=limiter;