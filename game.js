import { readline } from "./main.js";

export async function process(c) {
    for(;;) {
        const c = await readline();
        console.log(`Game got command: ${c}`);
    }

}

window.addEventListener("DOMContentLoaded", () => {
    process();
});
