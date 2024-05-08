const Category = require("../models/Category");


// Todo: Create New Category                  POST /api/v1/categories                  Private/Admin
exports.createCategoryController = async (req, res) => {
    const { name } = req.body;

    try {
        // Check Category Exists
        const categoryExists = await Category.findOne({ name: name });
        if (categoryExists) throw new Error('Category already exists');

        // Create Category
        const category = await Category.create({
            name: name,
            user: req.userAuthId,
            image: req?.file?.path ? req?.file?.path : "No Photo",
        });

        // Send response
        res.status(201).json({
            status: "success",
            message: "Category Created Succesfully",
            category,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message,
        });
    }
};


// Todo: Read All Categories                  GET /api/v1/categories                   Public
exports.getCategoriesController = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        message: "Categories Fetched Succesfully",
        results: categories?.length,
        categories,
    });
};


// Todo: Read Single Category                 GET /api/v1/categories/:id               Public
exports.getCategoryController = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Category Fetched Succesfully",
            category,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Category not Found",
        });
    }
};


// Todo: Update Category                      PUT /api/v1/categories/:id               Private/Admin
exports.updateCategoryController = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.status(200).json({
            status: "success",
            message: "Category Updated Succesfully",
            updatedCategory,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Category not Found",
        });
    }
};


// Todo: Delete Category                      DELETE /api/v1/categories/:id            Private/Admin
exports.deleteCategoryController = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: 'Category Deleted Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Category not Found",
        });
    }
};