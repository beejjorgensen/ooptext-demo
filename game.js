import { readline } from "./io.js";

export async function run_game(c) {
    for(;;) {
        const c = await readline();
        console.log(`Game got command: ${c}`);
    }

}

