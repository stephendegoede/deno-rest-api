import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "../src/routes.ts";

const app = new Application();
const port = 5001;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port });
