'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var estuturaEnum = {
  values: 'Base Flores'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};
var estruturaInventorySchema = new Schema({
    // createdDate: {type: Date,default: Date.now},
    // status: {type: String,enum: statusEnum,default:'' }
    estrutura: {type: String,enum: estuturaEnum,default:'' },
    color: {type: String,default:'' }
});
var priceInventorySchema = new Schema({
    name: {type: String,default:'' },
    price: {type: Number,default:0 }
});
var discountSchema = new Schema({
    type: {type: String,default:'' },
    quantity: {type: Number,default:0 },
    value: {type: Number,default:0 }
});
var objectEncomendaPropertiesSchema = {
    recheios:{
        type:[String],
        default: [],
        select: true
    },
    tipoDeFlor:{
        type:[String],
        default: [],
        select: true
    },
    availableEncomenda: {
        type: Boolean,
        default:false
    },
    discount: {
        type: Schema.Types.Mixed,
        default:{}
    },
    hasDiscount: {
        type: Boolean,
        default:false
    },
    estruturas: {
        type: [estruturaInventorySchema],
        default:[]
    },
    recheiosPrice: {
        type: [priceInventorySchema],
        default:[]
    },
    flowerPrice: {
        type: [priceInventorySchema],
        default:[]
    },
    _id:{type:String,default:''}
};

var EncomendaPropertiesSchema = new Schema(objectEncomendaPropertiesSchema);
exports.getEncomendaPropertiesSchema = function(){
	return objectEncomendaPropertiesSchema;
};
mongoose.model('EncomendaProperties', EncomendaPropertiesSchema,'encomendaProperties');