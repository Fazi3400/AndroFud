import db from "../db";
import * as schema from "../schema";

// Products are now managed through admin panel only
// No hardcoded seed data - all products added through /admin/products

const seedProducts = async () => {
  try {
    // Clear old products if needed (optional)
    // await db.delete(schema.products);
    console.log("✅ Products seeding skipped - use admin panel to add products");
  } catch (err) {
    console.log("Error during products seed", err);
  }
};

export default seedProducts;
