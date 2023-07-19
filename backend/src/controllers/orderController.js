const Order = require("../models/orderModel");
const User = require("../models/userModel");

const get_all_orders = async (req, res) => {
	Order.getAll()
		.then((orders) => {
			res.send(orders);
		})
		.catch((error) => {
			res.status(500).send({ message: "Orders not found" });
		});
};

const get_order_by_id = async (req, res) => {
	Order.getOne(req.params.id)
		.then((order) => {
			res.send(order.properties);
		})
		.catch((error) => {
			res.status(500).send({ message: "product not found" });
		});
}

const get_order_by_user = async (req, res) => {
	Order.getByUser(req.params.id)
		.then((order) => {
			res.send(order);
		})
		.catch((error) => {
			res.status(500).send({ message: "product not found" });
		});
}

const create_order = async (req, res) => {
	const { userId , shippingAddressId} = req.body;
	console.table({ userId,shippingAddressId });
	const order = new Order(userId,shippingAddressId);
	order.save(userId,shippingAddressId).then((result) => {
		
		res.send(result);

	}).catch((error) => {
		console.log(error);
		res.status(500).send({ message: "Error creating order" });
	});
}

const update_order_status = async (req, res) => {
	const { order , product, status } = req.body;

	Order.updateOrderStatus(order, product, status).then((result) => {
		
		res.send(result);

	}).catch((error) => {
		console.log(error);
		res.status(500).send({ message: "Error creating order" });
	});
}


const rate_product = async (req, res) => {
	const { user, product, rating,order,feedback } = req.body;
	console.log(req.body);
	Order.rate({user : user, product : product, rating : rating, order : order, feedback : feedback}).then((result) => {
		console.log(result);
		res.send(result);
	}).catch((error) => {
		console.log(error);
		res.status(500).send({ message: "Error rating product" });
	});
}

const gen_recommendations = async (req, res) => {
	try {
		const userId = req.body.userId;
		Order.generateRecommendations(userId).then((result) => {
			res.send(result);
		}).catch((error) => {
			res.status(500).send({ message: "Error generating recommendations" });
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
}

module.exports = {
	get_all_orders,
	get_order_by_id,
	create_order,
	rate_product,
	gen_recommendations,
	get_order_by_user,update_order_status
}