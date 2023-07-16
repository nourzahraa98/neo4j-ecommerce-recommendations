

const express = require("express");
const user_router = express.Router();
const {
	login_user,
	register_user,
	get_all_users,
	get_one_user,
	update_user,
	delete_user,
	add_to_cart,
	add_shipping_address,
	get_card_by_user_id,
	get_shipping_address,delete_shipping_address
} = require("../controllers/userController");


user_router.post("/login", login_user,);
user_router.post("/register", register_user,);
user_router.get("/", get_all_users,);
user_router.get("/:id", get_one_user,);
user_router.patch("/:id", update_user,);
user_router.delete("/:id", delete_user);
user_router.post("/addtocart", add_to_cart);
user_router.get("/cart/:id", get_card_by_user_id);
user_router.post('/shipping-address',add_shipping_address)
user_router.get('/shipping-address/:id',get_shipping_address)
user_router.delete("/shipping-address/:id", delete_shipping_address);

module.exports = user_router;