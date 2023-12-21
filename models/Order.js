const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({

    order_data: {
        type: Array,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    }

});

module.exports = mongoose.model('Order', OrderSchema)