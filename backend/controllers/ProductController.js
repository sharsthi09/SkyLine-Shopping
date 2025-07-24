const mongoose = require("mongoose");
const { generateUniqueImageName } = require("../helping");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");



class ProductController {
    //to create 
    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newProductImageName = generateUniqueImageName(file.name);
                    const destination = "./Public/images/product/" + newProductImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: "Product not created due to image error",
                                        status: 0
                                    }
                                )
                            }
                            else {
                                if (data.productName && data.productSlug) {
                                    const product = new ProductModel(
                                        {
                                            ...data,
                                            colors: JSON.parse(data.colors),
                                            main_img: newProductImageName
                                        }
                                    )
                                    product.save().then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: "Product created",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error)
                                            reject(
                                                {
                                                    msg: "Product not created",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )

                                } else {
                                    reject(
                                        {
                                            msg: "All data is required",
                                            status: 0
                                        }
                                    )
                                }
                            }
                        }
                    )

                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    //to read
 read(id, query) {
  return new Promise(async (resolve, reject) => {
    try {
      let newQuery = {};

      // Category filter
      if (query.categoryslug) {
        const category = await CategoryModel.findOne({ categoryslug: query.categoryslug });
        if (!category) {
          return resolve({
            msg: "Category not found",
            status: 0,
            products: []
          });
        }
        newQuery.category_id = category._id;
      }

      // Color filter
      if (query.productColor) {
        if (mongoose.Types.ObjectId.isValid(query.productColor)) {
          newQuery.colors = { $in: [query.productColor] };
        } else {
          return reject({
            msg: "Invalid Color Id",
            status: 0
          });
        }
      }

      // Price Range filter
      if (query.minPrice !== undefined && query.maxPrice !== undefined) {
        const min = Number(query.minPrice);
        const max = Number(query.maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
          newQuery.final_price = { $gte: min, $lte: max };
        }
      }

      // Fetching Product(s)
      if (id) {
        const product = await ProductModel.findById(id).populate(["category_id", "colors"]);
        if (!product) {
          return resolve({
            msg: "Product not found",
            status: 0
          });
        }
        // 👈 return single product here
        return resolve({
          msg: "Product found",
          status: 1,
          product
        });
      } else {
        const limit = parseInt(query.limit);
        const products = await ProductModel.find(newQuery)
          .populate(["category_id", "colors"])
          .limit(!isNaN(limit) ? limit : 100000);

        // 👈 return products array here
        return resolve({
          msg: "Products found",
          status: 1,
          products
        });
      }

    } catch (error) {
      console.log(error);
      reject({
        msg: "Internal server error",
        status: 0
      });
    }
  });
}





    //update
    update(id, flag) {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await ProductModel.findById(id);

                // Compute updated values based on flag
                const updatedStatus = flag == 2 ? !product.status : product.status;
                const updatedStock = flag == 1 ? !product.stock : product.stock;
                const updatedTopSelling = flag == 3 ? !product.top_selling : product.top_selling;

                await ProductModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            status: updatedStatus,
                            stock: updatedStock,
                            top_selling: updatedTopSelling
                        }
                    }
                );

                // Decide message based on flag and updated values
                let msg = "";
                if (flag == 2) {
                    msg = updatedStatus ? "Product Activated" : "Product Deactivated";
                } else if (flag == 1) {
                    msg = updatedStock ? "Product In Stock" : "Product Out of Stock";
                } else if (flag == 3) {
                    msg = updatedTopSelling ? "Marked as Top Selling" : "Removed from Top Selling";
                } else {
                    msg = "No valid update performed";
                }

                resolve({
                    msg,
                    status: 1
                });

            } catch (error) {
                console.log(error);
                reject({
                    msg: "Internal server error",
                    status: 0
                });
            }
        });
    }


    //to upload multiple images
    multipleImages(allFiles, id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const product = await ProductModel.findById(id);
                    if (product) {
                        let currentImages = product.other_img;
                        const allNewFiles = Array.isArray(allFiles) ? allFiles : [allFiles];

                        for (let files of allNewFiles) {
                            const newProductImageName = generateUniqueImageName(files.name);
                            currentImages.push(newProductImageName);
                            const destination = "./Public/images/product/" + newProductImageName;
                            files.mv(destination);

                            ProductModel.updateOne(
                                {
                                    _id: id
                                },
                                {
                                    $set: {
                                        other_img: currentImages
                                    }
                                }
                            ).then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: "Images uploaded",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {
                                    console.log(error)
                                    reject(
                                        {
                                            msg: "Images not uploaded",
                                            status: 0
                                        }
                                    )
                                }
                            )
                        }
                    } else {
                        reject(
                            {
                                msg: "Product not found",
                                status: 0
                            }
                        )
                    }
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }


            }
        )
    }

    //to edit
    editProduct(id, data, file) {
        return new Promise(async (resolve, reject) => {
            try {
                // Fetch the current product data
                const existingProduct = await ProductModel.findById(id);
                if (!existingProduct) {
                    return reject({ msg: "Product not found", status: 0 });
                }

                // Handle color parsing
                let parsedColor = existingProduct.colors;
                try {
                    if (data.color) {
                        parsedColor = JSON.parse(data.colors);
                    }
                } catch (err) {
                    console.error("Failed to parse color:", err.message);
                    return reject({ msg: "Invalid color format", status: 0 });
                }

                // Determine updated fields
                const updatedData = {
                    productName: data.productName || existingProduct.productName,
                    productSlug: data.productSlug || existingProduct.productSlug,
                    short_description: data.short_description || existingProduct.short_description,
                    long_description: data.long_description || existingProduct.long_description,
                    original_price: data.original_price || existingProduct.original_price,
                    discount_percentage: data.discount_percentage || existingProduct.discount_percentage,
                    final_price: data.final_price || existingProduct.final_price,
                    category_id: data.category_id || existingProduct.category_id,
                    colors: parsedColor,
                    main_img: existingProduct.main_img // default to existing image
                };

                // If file is uploaded, update the image
                if (file) {
                    const newProductImageName = generateUniqueImageName(file.name);
                    const destination = "./Public/images/product/" + newProductImageName;

                    file.mv(destination, async (error) => {
                        if (error) {
                            return reject({ msg: "Product not updated due to image error", status: 0 });
                        }
                        try {
                            await ProductModel.updateOne(
                                {
                                    _id: id
                                },
                                {
                                    $set: {
                                        updatedData,
                                        main_img: updatedData.main_img = newProductImageName
                                    }
                                });
                            resolve({ msg: "Product Updated", status: 1 });
                        } catch (err) {
                            console.error(err);
                            reject({ msg: "Product not Updated", status: 0 });
                        }
                    });
                } else {
                    // No file, just update other fields
                    await ProductModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: updatedData
                        });
                    resolve({ msg: "Product Updated", status: 1 });
                }
            } catch (error) {
                console.error(error);
                reject({ msg: "Internal server error", status: 0 });
            }
        });
    }

    //to delete
    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    ProductModel.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Product Deleted",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Product Not Deleted",
                                    status: 0
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
}

module.exports = ProductController;