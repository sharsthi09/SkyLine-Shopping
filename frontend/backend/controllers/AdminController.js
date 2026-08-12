const { encryptPassword, decryptPassword, accessToken } = require("../helping");
const AdminModel = require("../models/AdminModel");

class AdminController {
    create(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const checkemail = await AdminModel.findOne({ email: data.email });
                    if (checkemail) {
                        reject(
                            {
                                msg: "Email already exist",
                                status: 0
                            }
                        )
                    }
                    else {
                        const admin = new AdminModel(
                            {
                                ...data,
                                password: encryptPassword(data.password)
                            }
                        )
                        admin.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Admin Created",
                                        status: 1
                                    }
                                )
                            }
                        )
                            .catch(
                                (error) => {
                                    console.log(error)
                                    reject(
                                        {
                                            msg: "Admin not created",
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
                    const admin = await AdminModel.findOne({ email: data.email })
                    if(admin){
                        if(data.password == decryptPassword(admin.password)){
                            resolve(
                                {
                                    msg:"Login Successfully",
                                    status:1,
                                    admin:{...admin.toJSON(),password:null},
                                    token: accessToken(admin.toJSON()) 
                                }
                            )
                        }
                        else{
                            reject(
                                {
                                    msg:"Password is incorrect",
                                    status:0
                                }
                            )
                        }
                    }else{
                        reject(
                            {
                                msg:"Email does not exist",
                                status:0
                            }
                        )
                    }
                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg:"Internal server error",
                            status:0
                        }
                    )
                }

            }
        )
    }


}
module.exports = AdminController;