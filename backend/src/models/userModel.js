const { RunQuery } = require("../db_connect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, region, name) {
    this.email = email;
    this.password = password;
    this.region = region;
    this.name = name;
  }

  async save() {
    this.password = await bcrypt.hash(this.password, 10);
    const checkQuery = `MATCH (n:User) WHERE n.email = '${this.email}' RETURN n`;
    const result = await RunQuery(checkQuery);
    if (result.records.length > 0) {
      throw new Error(`A user with the email ${this.email} already exists`);
    }
    const createQuery = `CREATE (n:User {id: "${uuidv4()}", email: '${
      this.email
    }', password: '${this.password}', name : '${this.name}' , region: '${
      this.region
    }'}) RETURN n`;
    const user = await RunQuery(createQuery);
    const a = user.records[0].get('n')
    return  a.properties
  }

  static async addToCart(userId, productId, quantity) {
    const query = `MATCH (u:User), (p:Product) WHERE u.id = '${userId}' AND p.id = '${productId}' CREATE (u)-[r:HAS_IN_CART {quantity: ${quantity} , id : '${uuidv4()}'}]->(p) RETURN r`;
    const result = await RunQuery(query);
    return result.records[0].get("r");
  }

  static async get_products_incart(userId) {
    const query = `MATCH (u:User)-[r:HAS_IN_CART]->(p:Product) WHERE u.id = '${userId}' RETURN p, r`;
    const result = await RunQuery(query);
     let products = []
      result.records.map((record) => {
      let product
      product = record.get("p").properties;
      product.quantity = record.get("r").properties.quantity;
      product.cartId = record.get("r").properties.id
      products.push(product)
    });
    console.log(products)
    return products

  }

  static async getAll() {
    const query = `MATCH (n:User) RETURN n`;
    const result = await RunQuery(query);
    return result.records.map((record) => record.get("n"));
  }

  static async getOne(id) {
    console.log(id)
    const query = `MATCH (n:User) WHERE n.id = '${id}' RETURN n`;
    const result = await RunQuery(query);

    if (result.records.length === 0) return null;

    return result.records[0].get("n");
  }

  static async getByEmail(email) {
    const query = `MATCH (n:User) WHERE n.email = '${email}' RETURN n`;
    const result = await RunQuery(query);
    if (result.records.length === 0) return null;
    return result.records[0].get("n");
  }

  static async update(id, email, password, name, phone, region) {
    const updateProperties = {};
    console.log(phone);
    if (email) {
      updateProperties.email = email;
    }

    if (password) {
      // Hash the password before saving it to the database
      password = await bcrypt.hash(password, 10);
      updateProperties.password = password;
    }

    if (name) {
      updateProperties.name = name;
    }

    if (phone) {
      updateProperties.phone = phone;
    }

    if (region) {
      updateProperties.region = region;
    }

    const updatePropertiesString = Object.entries(updateProperties)
      .map(([key, value]) => `n.${key} = '${value}'`)
      .join(", ");

    console.log(updateProperties);

    const query = `
		  MATCH (n:User {id: '${id}'})
		  SET ${updatePropertiesString}
		  RETURN n
		`;

    const result = await RunQuery(query);

    if (result.records.length === 0) return null;

    return result.records[0].get("n");
  }

  // static async update(id, email, password) {
  // 	// Hash the password before saving it to the database
  // 	password = await bcrypt.hash(password, 10);
  // 	const query = `
  //   MATCH (n:User) WHERE n.id = '${id}'
  //   SET ${Object.entries({ email, password })
  // 			.filter(([, value]) => value)
  // 			.map(([key, value]) => `n.${key} = '${value}'`)
  // 			.join(", ")}
  //   RETURN n
  // `;
  // 	await RunQuery(query);
  // }

  static async delete(id) {
    const query = `MATCH (n:User) WHERE n.id = '${id}' DELETE n`;
    const result = await RunQuery(query);
    return `Delete operation for user ${id} ended successfully`;
  }



  static async delete_cart(userId) {
    const query = `MATCH (u:User)-[r:HAS_IN_CART]->(p:Product) WHERE u.id = '${userId}' DELETE r`;
    const result = await RunQuery(query);
    return result.records.map((record) => record.get("p3"));
  }

  static async delete_item_from_cart(cartId){
    const query = `
    MATCH (u:User)-[r:HAS_IN_CART]->(p:Product)
    WHERE r.id = '${cartId}'
    DELETE r
`;

const result = await RunQuery(query);
return result;

  }

  static async add_shipping_address({
    userId,
    name,
    address,
    city,
    country,
    zipCode,
  }) {
    const query = `
	MATCH (u:User) WHERE u.id = '${userId}'
	CREATE (u)-[:HAS_SHIPPING_ADDRESS]->(a:ShippingAddress {
    id : '${uuidv4()}',
	  name: '${name}',
	  city: '${city}',
	  country: '${country}',
	  zipcode: '${zipCode}',
	address: '${address}'
	})
	RETURN u, a
	`;

    const result = await RunQuery(query);

    return  result.records.map((record) => record.get("a"));
  }

  static async get_shipping_address(user) {
    const query = `  MATCH (u:User)-[:HAS_SHIPPING_ADDRESS]->(a:ShippingAddress)
	WHERE u.id = '${user}'
	RETURN a
	`;

    const result = await RunQuery(query);
    return  result.records.map((record) => record.get("a").properties);
  }

  static async delete_shipping_address(id) {
    const query = `
    MATCH (a:ShippingAddress)<-[r:HAS_SHIPPING_ADDRESS]-(u:User)
    WHERE a.id = '${id}'
    DELETE a, r
    RETURN u
  `;

    const result = await RunQuery(query);
    return  result
  }
}

module.exports = User;
