function allowCrossOrigin(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with,Content-Type,Accept,ApiToken');

    next()
}

module.exports = allowCrossOrigin