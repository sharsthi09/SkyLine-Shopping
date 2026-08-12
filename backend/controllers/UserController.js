const { encryptPassword, decryptPassword, accessToken } = require("../helping");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");
const WishlistModel = require("../models/WishlistModel");


class UserController {
  create(data) {
    return new Promise(
      async (resolve, reject) => {
        try {
          const checkemail = await UserModel.findOne({ email: data.email });
          if (checkemail) {
            reject(
              {
                msg: "Email already exist",
                status: 0
              }
            )
          }
          else {
            const user = new UserModel(
              {
                ...data,
                password: encryptPassword(data.password)
              }
            )
            user.save().then(
              (success) => {
                resolve(
                  {
                    msg: "User Created",
                    status: 1,
                    user: { ...user.toJSON(), password: null },
                    token: accessToken(user.toJSON())
                  }
                )
              }
            )
              .catch(
                (error) => {
                  console.log(error)
                  reject(
                    {
                      msg: "User not created",
                      status: 0
                    }
                  )
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


  login(data) {
    return new Promise(
      async (resolve, reject) => {
        try {
          const user = await UserModel.findOne({ email: data.email })
          if (user) {
            if (data.password == decryptPassword(user.password)) {
              resolve(
                {
                  msg: "Login Successfully",
                  status: 1,
                  user: { ...user.toJSON(), password: null },
                  token: accessToken(user.toJSON())
                }
              )
            }
            else {
              reject(
                {
                  msg: "Password is incorrect",
                  status: 0
                }
              )
            }
          } else {
            reject(
              {
                msg: "Email does not exist",
                status: 0
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

  moveToDb(data, userId) {
    return new Promise(
      async (resolve, reject) => {
        try {
          // console.log(data,userId)
          if (data) {
            const allPromise = data.map(
              async (cartItem, cartIndex) => {
                const existingProduct = await CartModel.findOne({ product_id: cartItem.id, user_id: userId }) ?? null;
                if (existingProduct) {
                  await CartModel.updateOne(
                    { _id: existingProduct._id },
                    {
                      $inc: {
                        qty: cartItem.quantity
                      }
                    }
                  ).then(
                    (success) => {
                      console.log(success)
                    }
                  ).catch(
                    (error) => {
                      console.log(error);
                    }
                  )

                } else {
                  await new CartModel(
                    {
                      user_id: userId,
                      product_id: cartItem.id,
                      qty: Number(cartItem.quantity)
                    }
                  ).save().then(
                    (success) => {
                      console.log(success)
                    }
                  ).catch(
                    (error) => {
                      console.log(error);
                    }
                  )
                }
              }
            )
            await Promise.all(allPromise)
            const latestCart = await CartModel.find({ user_id: userId }).populate("product_id", "_id productName original_price final_price main_img category_id discount_percentage")
            // console.log(latestCart)
            resolve(
              {
                latestCart: latestCart,
                msg: "Move to Cart Successfully",
                status: 1
              }
            )

          } else {
            console.log("Cart is Empty")
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

  addToCart(data) {
    return new Promise(
      async (resolve, reject) => {
        // console.log(data);
        try {
          const existingProduct = await CartModel.findOne({ user_id: data.user_id, product_id: data.product_id })
          // console.log(existingProduct) 
          if (existingProduct) {
            await CartModel.updateOne({ _id: existingProduct._id },
              {
                $inc: {
                  qty: 1
                }
              }
            ).then(
              (success) => {
                console.log(success);
              }
            ).catch(
              (error) => {
                console.log(error);
              }
            )
          } else {
            await new CartModel(
              {
                user_id: data.user_id,
                product_id: data.product_id,
                qty: 1
              }
            ).save().then(
              (success) => {
                console.log(success);
              }
            ).catch(
              (error) => {
                console.log(error);
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

  removeFromCart(userId, productId) {
    return new Promise(async (resolve, reject) => {
      try {
        await CartModel.deleteOne({ user_id: userId, product_id: productId });
        const latestCart = await CartModel.find({ user_id: userId })
          .populate("product_id", "_id productName final_price main_img discount_percentage");
          // console.log(latestCart)
        resolve({
          latestCart,
          msg: "Item removed from cart successfully",
          status: 1
        });
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }


  updateCartQuantity(userId, productId, delta) {
    return new Promise(async (resolve, reject) => {
      try {
        const existing = await CartModel.findOne({ user_id: userId, product_id: productId });
        if (!existing) {
          return reject({ msg: "Product not found in cart", status: 0 });
        }

        const newQty = existing.qty + delta;
        if (newQty < 1) {
          await CartModel.deleteOne({ _id: existing._id });
        } else {
          await CartModel.updateOne({ _id: existing._id }, { qty: newQty });
        }

        const latestCart = await CartModel.find({ user_id: userId })
          .populate("product_id", "_id productName final_price main_img discount_percentage");

        resolve({
          latestCart,
          msg: "Cart quantity updated successfully",
          status: 1
        });
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }

  addToWishlist(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProduct = await WishlistModel.findOne({
          user_id: data.user_id,
          product_id: data.product_id
        });

        if (existingProduct) {
          return reject({ msg: "Item already in wishlist", status: 0 });
        }

        await new WishlistModel({
          user_id: data.user_id,
          product_id: data.product_id
        }).save();

        const latestWishlist = await WishlistModel.find({ user_id: data.user_id })
          .populate("product_id", "_id productName final_price main_img");

        resolve({
          latestWishlist,
          msg: "Item added to wishlist",
          status: 1
        });
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }


  removeFromWishlist(userId, productId) {
    return new Promise(async (resolve, reject) => {
      try {
        await WishlistModel.deleteOne({ user_id: userId, product_id: productId });

        const latestWishlist = await WishlistModel.find({ user_id: userId })
          .populate("product_id", "_id productName final_price main_img");

        resolve({
          latestWishlist,
          msg: "Item removed from wishlist",
          status: 1
        });
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }

  getWishlist(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const wishlist = await WishlistModel.find({ user_id: userId })
          .populate("product_id", "_id productName final_price main_img");

        resolve({
          wishlist,
          msg: "Wishlist fetched successfully",
          status: 1
        });
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }

  moveWishlistToDb(data, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (data && data.length) {
          const allPromise = data.map(async (wishlistItem) => {
            const existingProduct = await WishlistModel.findOne({
              user_id: userId,
              product_id: wishlistItem.id
            }) ?? null;

            if (!existingProduct) {
              await new WishlistModel({
                user_id: userId,
                product_id: wishlistItem.id
              }).save();
            }
          });

          await Promise.all(allPromise);

          const latestWishlist = await WishlistModel.find({ user_id: userId })
            .populate("product_id", "_id productName final_price main_img");

          resolve({
            latestWishlist,
            msg: "Wishlist items moved to DB successfully",
            status: 1
          });
        } else {
          resolve({
            latestWishlist: [],
            msg: "No items in wishlist to move",
            status: 1
          });
        }
      } catch (error) {
        console.log(error);
        reject({ msg: "Internal server error", status: 0 });
      }
    });
  }




}
module.exports = UserController;