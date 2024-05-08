const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");


// Todo: Create New Product                  POST /api/v1/products                  Private/Admin
exports.createProductController = async (req, res) => {
    const convertedImages = req?.files?.map((file) => file.path);
    const { name, description, brand, category, sizes, colors, price, totalQty } = req.body;

    try {
        // Check Product Exists
        const productExists = await Product.findOne({ name });
        if (productExists) throw new Error('Product already exists');

        // Find the Category/Brand
        const categoryFound = await Category.findOne({ name: category });
        if (!categoryFound) throw new Error('Category not found, please create category first or check category name');
        const brandFound = await Brand.findOne({ name: brand });
        if (!brandFound) throw new Error('Brand not found, please create brand first or check brand name');
        if (totalQty > 100) throw new Error('You are not allowed to sell more than 100 Product');

        // Create Product
        const product = await Product.create({
            name,
            description,
            brand,
            category,
            sizes,
            colors,
            user: req.userAuthId,
            images: convertedImages,
            price,
            totalQty
        });

        // Push the Product into Category/Brand and Resave
        categoryFound.products.push(product._id);
        brandFound.products.push(product._id);
        await categoryFound.save();
        await brandFound.save();

        // Send response
        res.status(201).json({
            status: "success",
            message: "Product Created Succesfully",
            product,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Read All Products (Filtering)       GET /api/v1/products                   Public
exports.getProductsController = async (req, res) => {
    // Query
    let productQuery = Product.find();

    // Filtering
    if (req.query.name) productQuery = productQuery.find({ name: { $regex: req.query.name, $options: "i" } });
    if (req.query.brand) productQuery = productQuery.find({ brand: { $regex: req.query.brand, $options: "i" } });
    if (req.query.category) productQuery = productQuery.find({ category: { $regex: req.query.category, $options: "i" } });
    if (req.query.color) productQuery = productQuery.find({ colors: { $regex: req.query.color, $options: "i" } });
    if (req.query.size) productQuery = productQuery.find({ sizes: { $regex: req.query.size, $options: "i" } });
    if (req.query.price) {
        if (req.query.price.includes("Above")) {
            const mimimumPrice = req.query.price.split(" ")[0];
            productQuery = productQuery.find({ price: { $gte: mimimumPrice, $lte: 9999999 } });
        } else {
            const priceRange = req.query.price.split("-");
            productQuery = productQuery.find({ price: { $gte: priceRange[0], $lte: priceRange[1] } });
        }
    }

    // Pagination
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(limit);
    // Pagination Result
    const pagination = {};
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };

    const products = await productQuery.populate('reviews');
    res.status(200).json({
        status: "success",
        message: "Products Fetched Succesfully",
        totalProducts: total,
        results: products?.length,
        pagination,
        products,
    });
};


// Todo: Read Single Product                 GET /api/v1/products/:id               Public
exports.getProductController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "user",
                select: "username"
            }
        });
        // if(!product) throw new Error("Product not Found");
        res.status(200).json({
            status: "success",
            message: "Product Fetched Succesfully",
            product,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Product not Found",
            // message: error?.message
        });
    }
};


// Todo: Update Product                      PUT /api/v1/products/:id               Private/Admin
exports.updateProductController = async (req, res) => {
    const { name, description, brand, category, sizes, colors, user, image, price, totalQty } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            brand,
            category,
            sizes,  
            colors,
            user,
            image,
            price,
            totalQty
        }, {
            new: true,
            runValidators: true,
        }
        );

        res.status(200).json({
            status: "success",
            message: "Product Updated Succesfully",
            updatedProduct,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Product not Found",
        });
    }
};


// Todo: Delete Product                      DELETE /api/v1/products/:id            Private/Admin
exports.deleteProductController = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: 'Product Deleted Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Product not Found",
        });
    }
};