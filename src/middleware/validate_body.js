const validateBody = (requiredFields = []) => (req, res, next) => {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        return res.status(400).json({ message: "Request body must be a JSON object" })
    }

    const missingFields = requiredFields.filter((field) => {
        const value = req.body[field]
        return value === undefined || value === null || value === ""
    })

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: "Missing required fields",
            fields: missingFields
        })
    }

    next()
}

export default validateBody
