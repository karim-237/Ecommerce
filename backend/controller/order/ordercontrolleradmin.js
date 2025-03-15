const orderModel = require("../../models/orderProductModel");

const orderControllerAdmin = async (request,response) =>{
    try {
        const currentUserId = request.userId;
        const orderList = await orderModel.find()

        response.json({
            data : orderList,
            message: "Order list",
            success: true
        })
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = orderControllerAdmin;