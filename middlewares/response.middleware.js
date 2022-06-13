const responseMiddleware = (req, res, next) => {
    res.status(200).json(res.dataToSend)
    return next();
}
const responseErrorMiddleware = (error, req, res, next) => {
    if (error.message.split(' ').includes('entity'))
        res.status(400).json({error:true,message:error.message})
    else
        res.status(404).json({error:true,message:error.message})
    return next();
}

exports.responseMiddleware = responseMiddleware;
exports.responseErrorMiddleware = responseErrorMiddleware;