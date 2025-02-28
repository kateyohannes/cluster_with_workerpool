import workerpool from "workerpool";
import fibonacci from "./fibonacci.js"

workerpool.worker({
    fibonacci
});
