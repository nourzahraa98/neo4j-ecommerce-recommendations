
const {
	get_all_orders,
	get_order_by_id,
	create_order,
	rate_product,
	gen_recommendations,
	get_order_by_user,update_order_status
} = require("../controllers/orderController");

const order_router = require("express").Router();


order_router.post("/checkout", create_order);

order_router.get("/", get_all_orders);

order_router.get("/:id", get_order_by_id);
order_router.get("/user/:id", get_order_by_user);

order_router.post("/rating", rate_product);
order_router.patch('/status',update_order_status)
order_router.post('/recommendations', gen_recommendations);

module.exports = order_router;
