import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);


export const createViewPage=(page)=> path.resolve(__dirname,"../views",`${page}.hbs`)