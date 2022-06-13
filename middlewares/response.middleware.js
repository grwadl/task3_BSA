const responseMiddleware = (req, res, next) => {
    next();
}

exports.responseMiddleware = responseMiddleware;