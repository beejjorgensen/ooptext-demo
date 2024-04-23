import { readline, print } from "./io.js";
import { Room } from "./room.js";

const room1 = new Room("Outside Entrance", "You're standing outside the cave entrance. Cold air flows out mouth of the cave.");
const room2 = new Room("Outside Entrance", "You're standing outside the cave entrance. Cold air flows out mouth of the cave.");

room1.s_to = room2;
room2.n_to = room1;

let player_loc = room1;

export async function run_game(c) {
    print("<b><i>Welcome to the Demo Adventure!</i></b><p>");

    for(;;) {
        print(player_loc.get_full_desc());
        const c = await readline();
        print(`<p>&gt; ${c}<p>`)
    }
}

