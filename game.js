import { readline, print } from "./io.js";
import { Room } from "./room.js";
import { Entity } from "./entity.js";

const room1 = new Room("Outside Entrance", "You're standing outside the cave entrance, which is to the south. Cold air flows out mouth of the cave.");
const room2 = new Room("Inside Entrance", "You're just inside the entrance to the cave. Soft light filters in from the north, and a dark passage leads west.");

room1.s_to = room2;
room2.n_to = room1;

const sword = new Entity("sword", "a sword", "It's a shiny little sword");

room2.add(sword);

let player_loc = room1;

function print_cant_go() {
    print("<p>You can't go that way.");
}

function handle_look() {
    print(player_loc.get_full_desc());

    if (player_loc.contents.length != 0) {
        print("You also see:");
        for (const e of player_loc.contents) {
            print(`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${e.short_desc}`);
        }
    }
}

function handle_south() {
    if (player_loc.s_to) {
        player_loc = player_loc.s_to;
        handle_look();
    } else
        print_cant_go();
}

function handle_north() {
    if (player_loc.n_to) {
        player_loc = player_loc.n_to;
        handle_look();
    } else
        print_cant_go();
}

function handle_take() {
}

export async function run_game(c) {
    const command = {
        'l': handle_look,
        'look': handle_look,
        's': handle_south,
        'south': handle_south,
        'n': handle_north,
        'north': handle_north,
        'get': handle_take,
        'take': handle_take,
    };

    print("<h2><i>Welcome to the Demo Adventure!</i></h2>");

    handle_look();

    for(;;) {
        const c = await readline();
        if (c == "") continue;

        print(`<p class="command">&gt; ${c}`)

        const words = c.split(' ');

        if (command.hasOwnProperty(words[0]))
            command[words[0]](words);
        else
            print("<p>I don't recognize that command.");
    }
}

