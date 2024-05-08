const Color = require("../models/Color");


// Todo: Create New Color                  POST /api/v1/colors                  Private/Admin
exports.createColorController = async (req, res) => {
    const { name } = req.body;
    try {
        // Check Color Exists
        const colorExists = await Color.findOne({ name: name?.toLowerCase() });
        if (colorExists) throw new Error('Color already exists');

        // Create Color
        const color = await Color.create({
            name: name?.toLowerCase(),
            user: req.userAuthId,
        });

        // Send response
        res.status(201).json({
            status: "success",
            message: "Color Created Succesfully",
            color,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Read All Colors                  GET /api/v1/colors                    Public
exports.getColorsController = async (req, res) => {
    const colors = await Color.find();
    res.status(200).json({
        status: "success",
        message: "Colors Fetched Succesfully",
        results: colors?.length,
        colors,
    });
};


// Todo: Read Single Color                 GET /api/v1/colors/:id               Public
exports.getColorController = async (req, res) => {
    try {
        const color = await Color.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Color Fetched Succesfully",
            color,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Color not Found",
        });
    }
};


// Todo: Update Color                      PUT /api/v1/colors/:id               Private/Admin
exports.updateColorController = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedColor = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.status(200).json({
            status: "success",
            message: "Color Updated Succesfully",
            updatedColor,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Color not Found",
        });
    }
};


// Todo: Delete Color                     DELETE /api/v1/colors/:id            Private/Admin
exports.deleteColorController = async (req, res) => {
    try {
        await Color.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: 'Color Deleted Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Color not Found",
        });
    }
};