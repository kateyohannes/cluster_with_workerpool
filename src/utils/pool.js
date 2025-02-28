
'use strict';
import workerpool from "workerpool";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";




const __dirname = dirname(fileURLToPath(import.meta.url));
const pool = workerpool.pool(__dirname + '/worker.js');

export default pool;