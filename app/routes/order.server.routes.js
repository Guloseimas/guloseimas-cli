'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	order = require('../../app/controllers/order.server.controller');

module.exports = function(app) {
	app.route('/api/order/check')
		.get(order.getOrderById);
	
	app.route('/api/order/calculateEncomenda')
		.post(order.calculateEncomenda);

	app.route('/api/order/updateOrderOrAddItemEncomenda')
		.post(order.updateOrderOrAddItemEncomenda);
		
	app.route('/api/order/pagseguro')
		.get(order.processToPagseguro);

	app.route('/api/order')
		.get(order.getOrder);

	app.route('/api/order/updateOrderOrAddItem')
		.post(order.updateOrderOrAddItem);
	
	app.route('/api/order/addDeliveryAddress')
		.post(order.addDeliveryAddress);
		
	app.route('/api/order/removeItem')
		.post(order.removeItemCart);
		
	app.route('/api/order/clean')
		.get(order.clean);
};