'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var DBRef = mongoose.SchemaTypes.DBRef;

/**
 * Article Schema
 */
 
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
var objectInventorySchema = {
	_id: {
		type: String,
		default: '',
		trim: true
	},
	encomenda: {
		type: Boolean,
		default: true
	},
	temDoce: {
		type: Boolean,
		default: true
	},
	orderOutOfStock: {
		type: Boolean,
		default: false
	},
	sellInOutOfStock: {
		type: Boolean,
		default: false
	},
	recheio: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: String,
		default: '',
		trim: true
	},
	estruturas: {
		type: [estruturaInventorySchema],
		default:[]
	},
	quantity: {
		type: Number,
		default:0
	},
	priceWithQuantity: {
		type: Number,
		default: 0
	},
	priceWithQuantityFormatted: {
		type: String,
		default: 'R$ 0,00',
		trim: true
	},
	product:{type: DBRef, resolve: true}

};

var InventorySchema = new Schema(objectInventorySchema);
 
mongoose.model('Inventory', InventorySchema,'inventory');