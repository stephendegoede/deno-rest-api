import { Router } from "https://deno.land/x/oak/mod.ts";
import * as products from "./controllers/products.ts";

const router = new Router();
router.get("/api/v1/products", products.getProducts)
  .get("/api/v1/products/:id", products.getProduct)
  .post("/api/v1/products/", products.addProduct)
  .put("/api/v1/products/:id", products.updateProduct)
  .delete("/api/v1/products/:id", products.deleteProduct);

export default router;
