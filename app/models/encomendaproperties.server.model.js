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
var objectEncomendaPropertiesSchema = {
    recheios:{
        type:[String],
        default: [],
        select: false
    },
    tipoDeFlor:{
        type:[String],
        default: [],
        select: false
    },
    availableEncomenda: {
        type: Boolean,
        default:false
    },
    estruturas: {
        type: [estruturaInventorySchema],
        default:[]
    },
    _id:{type:String,default:''}
};

var EncomendaPropertiesSchema = new Schema(objectEncomendaPropertiesSchema);
exports.getEncomendaPropertiesSchema = function(){
	return objectEncomendaPropertiesSchema;
};
mongoose.model('EncomendaProperties', EncomendaPropertiesSchema,'encomendaProperties');