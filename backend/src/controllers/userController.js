const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getByEmail(email);
    console.log(user);
    if (!user) throw new Error("Invalid email or password");
    const valid = await bcrypt.compare(password, user.properties.password);
    if (!valid) throw new Error("Invalid email or password");
    res.send({
      email: user.properties.email,
      id: user.properties.id,
      name: user.properties.name,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const register_user = async (req, res) => {
  const { email, password, region, name } = req.body;
  try {
    const user = new User(email, password, region, name);
    u = await user.save();
    console.log(u);
    res.send({
      email: u.email,
      id: u.id,
      name: u.name,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_all_users = async (req, res) => {
  try {
    const users = await User.getAll()
      .then((users) => {
        res.send(users.map((user) => user.properties));
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const get_one_user = async (req, res) => {
  try {
    console.log(req.params)
    await User.getOne(req.params.id)
      
      .then((user) => {
        console.log(user)
        res.send(user.properties);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("user not found");
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update_user = async (req, res) => {
  const id = req.params.id;
  const { email, password, name, phone, region } = req.body;
  console.log(req.body);
  try {
    const user = await User.update(id, email, password, name, phone, region);
    res.send(user.properties);
  } catch (error) {
    res.status(500).send({ message: "Error updating user" });
  }
};

const delete_user = async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    res.send({ message: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const add_to_cart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    User.addToCart(userId, productId, quantity)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.send(error.message);
  }
};

const get_card_by_user_id = async (req, res) => {
  const products = User.get_products_incart(req.params.id)
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};


const delete_carrt_item = async (req, res) => {
  try {
    await User.delete_item_from_cart(req.params.id)

      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(" not found");
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const add_shipping_address = async (req, res) => {
  const { userId, name, address, zipCode, country, city } = req.body;
  try {
    User.add_shipping_address({
      address: address,
      zipCode: zipCode,
      country: country,
      city: city,
      name: name,
      userId: userId,
    })
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.send(error.message);
  }
};



const get_shipping_address = async (req, res) => {
  try {
    await User.get_shipping_address(req.params.id)

      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(" not found");
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const delete_shipping_address = async (req, res) => {
  try {
    await User.delete_shipping_address(req.params.id)

      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(" not found");
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  login_user,
  register_user,
  get_all_users,
  get_one_user,
  update_user,
  delete_user,
  add_to_cart,
  get_card_by_user_id,
  add_shipping_address,
  get_shipping_address,
  delete_shipping_address,
  delete_carrt_item
};
