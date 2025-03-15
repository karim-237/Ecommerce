const OrderNumber = require("../../models/orderProductModel")

const countOrderProduct = async(req,res)=>{
    try{
        const seen = "false";
 
        const count = await OrderNumber.countDocuments({
            seen : seen
        })

        res.json({ 
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
}

module.exports = countOrderProduct