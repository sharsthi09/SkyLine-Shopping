
const CategoryModel = require("../models/CategoryModel");
const { generateUniqueImageName } = require("../helping");
const ProductModel = require("../models/ProductModel");


class CategoryController {

    //to create 
    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newCategoryImageName = generateUniqueImageName(file.name);
                    const destination = "./Public/images/category/" + newCategoryImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: "Category not created due to image error",
                                        status: 0
                                    }
                                )
                            }
                            else {
                                if (data.categoryname && data.categoryslug) {
                                    const category = new CategoryModel(
                                        {
                                            // categoryname:data.categoryname,
                                            // categoryslug:data.categoryslug,
                                            // categoryimage:data.categoryimage,
                                            // categorystatus:data.categorystatus
                                            ...data,
                                            categoryimage: newCategoryImageName
                                        }
                                    )
                                    category.save().then(
                                        (success) => {
                                            resolve(
                                                {
                                                    msg: "Category created",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error)
                                            reject(
                                                {
                                                    msg: "Category not created",
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
    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let categories;
                    if (id) {
                        categories = await CategoryModel.findById(id);
                    }
                    else {
                        categories = await CategoryModel.find();
                        const data=[];
                        const allPromise= categories.map(
                            async(cat,index)=>{
                                const productCount=await ProductModel.find({category_id:cat._id}).countDocuments();
                                data.push({...cat.toJSON(), productCount});
                            }
                        )
                        await Promise.all(allPromise);
                        // console.log(data)
                        resolve(
                        {
                            msg: "Category Found",
                            status: 1,
                            categories: data
                        
                        }
                    )
                    }
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

    //to delete
    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    CategoryModel.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Category Deleted",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Category Not Deleted",
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

    //to edit
    edit(data, id, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (file) {
                        const newCategoryImageName = generateUniqueImageName(file.name);
                        const destination = "./Public/images/category/" + newCategoryImageName;
                        file.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    reject(
                                        {
                                            msg: "Category not updated due to image error",
                                            status: 0
                                        }
                                    )
                                }
                                else {
                                    if (data.categoryname && data.categoryslug) {
                                        CategoryModel.updateOne(
                                            {
                                                _id: id
                                            },
                                            {
                                                $set: {
                                                    categoryname: data.categoryname,
                                                    categoryslug: data.categoryslug,
                                                    categoryimage: newCategoryImageName
                                                }
                                            }
                                        ).then(
                                            (success) => {
                                                resolve(
                                                    {
                                                        msg: "Category Updated",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        ).catch(
                                            (error) => {
                                                console.log(error)
                                                reject(
                                                    {
                                                        msg: "Category not Updated",
                                                        status: 0
                                                    }
                                                )
                                            }
                                        )
                                    }
                                    else {
                                        CategoryModel.updateOne(
                                            {
                                                _id: id
                                            },
                                            {
                                                $set: {
                                                    categoryimage: newCategoryImageName
                                                }
                                            }
                                        ).then(
                                            (success) => {
                                                resolve(
                                                    {
                                                        msg: "Category Updated",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        ).catch(
                                            (error) => {
                                                console.log(error)
                                                reject(
                                                    {
                                                        msg: "Category not Updated",
                                                        status: 0
                                                    }
                                                )
                                            }
                                        )
                                    }
                                }
                            })
                    } else {
                        CategoryModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    categoryname: data.categoryname,
                                    categoryslug: data.categoryslug,
                                }
                            }
                        ).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Category Updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                reject(
                                    {
                                        msg: "Category not Updated",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }
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

    //to change status
    statusChange(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const category = await CategoryModel.findById(id);
                    CategoryModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                categorystatus: !category.categorystatus
                            }
                        }
                    ).then(
                        (success) => {
                            if (category.categorystatus == false) {
                                resolve(
                                    {
                                        msg: "Category Status Activated",
                                        status: 1
                                    }
                                )
                            }
                            else {
                                resolve(
                                    {
                                        msg: "Category Status Deactivated",
                                        status: 1
                                    }
                                )
                            }

                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Category Status Not Updated",
                                    status: 0
                                }
                            )
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
}

module.exports = CategoryController;