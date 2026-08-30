const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ message: "Invalid JSON body" })
    }

    console.error(error)
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
}

export default errorHandler
