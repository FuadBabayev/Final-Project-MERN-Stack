const Brand = require("../models/Brand");


// Todo: Create New Brand                  POST /api/v1/brands                  Private/Admin
exports.createBrandController = async (req, res) => {
    const { name } = req.body;
    try {
        // Check Brand Exists
        const brandExists = await Brand.findOne({ name: name });
        if (brandExists) throw new Error('Brand already exists');

        // Create Brand
        const brand = await Brand.create({
            name: name,
            user: req.userAuthId,
        });

        // Send response
        res.status(201).json({
            status: "success",
            message: "Brand Created Succesfully",
            brand,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Read All Brands                  GET /api/v1/brands                    Public
exports.getBrandsController = async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json({
        status: "success",
        message: "Brands Fetched Succesfully",
        results: brands?.length,
        brands,
    });
};


// Todo: Read Single Brand                 GET /api/v1/brands/:id               Public
exports.getBrandController = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Brand Fetched Succesfully",
            brand,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Brand not Found",
        });
    }
};


// Todo: Update Brand                      PUT /api/v1/brands/:id               Private/Admin
exports.updateBrandController = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.status(200).json({
            status: "success",
            message: "Brand Updated Succesfully",
            updatedBrand,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Brand not Found",
        });
    }
};


// Todo: Delete Brand                     DELETE /api/v1/brands/:id            Private/Admin
exports.deleteBrandController = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: 'Brand Deleted Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Brand not Found",
        });
    }
};