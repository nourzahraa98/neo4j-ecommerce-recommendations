const auth = require("neo4j-driver").auth;
const _driver = require("neo4j-driver").driver;
const { config } = require("dotenv");

config();

const neo4jUrl = process.env.NEO4J_URL;
const neo4jUsername = process.env.NEO4J_USERNAME;
const neo4jPassword = process.env.NEO4J_PASSWORD;

console.table({ neo4jUrl, neo4jUsername, neo4jPassword })

let driver = null;
let session = null;

async function openSession() {
  driver = _driver(neo4jUrl, auth.basic(neo4jUsername, neo4jPassword));
  session = driver.session({ database: "neo4j" });
}
async function closeSession() {
  await session.close();
  await driver.close();
}

async function RunQuery(query) {
  const PromisingFunction = async (query) => {
    await openSession();
    try {
      const result = await session.run(query);
    
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      
    }
  };
  const data = await PromisingFunction(query);

  return data;
}

module.exports = { openSession, closeSession, RunQuery };
