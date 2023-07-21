const Product = require("../models/productModel");

const get_all_products = async (req, res) => {
  Product.getAll()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "products not found" });
    });
};

const get_product_by_id = async (req, res) => {
  await Product.getOne(req.params.id)
    .then((product) => {
      res.send(product[0]);
    })
    .catch((error) => {
      res.status(500).send({ message: "product not found" });
    });
};



const get_highest_rated_product = async (req, res) => {

  await Product.getHighestRatedProduct()
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((error) => {
       console.log(error)
      return res.status(500).send({ message: error });
    });
};

const get_by_region = async (req, res) => {

  await Product.getByRegions(req.params.region)
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((error) => {
       console.log(error)
      return res.status(500).send({ message: error });
    });
};





const create_product = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product
      .save()
      .then(() => {
        res.send(product);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const delete_product = async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    Product.delete(req.params.id)
      .then((message) => {
        res.send({ message });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update_product = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, category } = req.body;
    await Product.update(id, name, price, description, category);
    res.send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating product" });
  }
};

const get_some_products = async (req, res) => {
  const limit = req.params.limit;
  Product.getAll()
    .then((products) => {
      res.send(products.slice(0, limit));
    })
    .catch((error) => {
      res.status(500).send({ message: "products not found" });
    });
};

const get_recommandations = async (req, res) => {
  const id = req.params.id;
  const a = await Product.get_recommandations(id);
  Product.get_recommandations(id)
    .then((arayofrecommandations) => {
      res.send(arayofrecommandations.map((product) => product.properties));
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "base de données sghira, ajouter plus de données" });
    });
};


const get_similiar_products = async (req, res) => {
  await Product.getSimilarProduct(req.params.id)
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      res.status(500).send({ message: "product not found" });
    });
};

module.exports = {
  get_all_products,
  get_product_by_id,
  create_product,
  delete_product,
  update_product,
  get_some_products,
  get_recommandations,
  get_highest_rated_product,get_similiar_products,get_by_region
};
