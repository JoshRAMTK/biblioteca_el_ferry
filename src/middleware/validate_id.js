const validateId = (req, res, next) => {
    const { id } = req.params

    if (!/^\d+$/.test(id) || Number(id) < 1) {
        return res.status(400).json({ message: "ID must be a positive integer" })
    }

    next()
}

export default validateId
