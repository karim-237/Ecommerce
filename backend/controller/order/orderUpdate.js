const orderModel = require('../../models/orderProductModel')
const orderControllerAdmin = require('./ordercontrolleradmin')



const orderUpdate = async (req, res) => {

    try {
        const { _id } = req?.body

        const seen = true

        const payload = {
            ...(seen && { seen: seen })
        }

        const updateSeen = await orderModel.findByIdAndUpdate(_id, payload)


        


        res.json({
            data: updateSeen,
            message: "Order validated !",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = orderUpdate;
