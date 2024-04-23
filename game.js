import { readline, print } from "./io.js";
import { Player, Room, Entity } from "./classes.js";

const room1 = new Room("Outside Entrance", "You're standing outside the cave entrance, which is to the south. Cold air flows out mouth of the cave.");
const room2 = new Room("Inside Entrance", "You're just inside the entrance to the cave. Soft light filters in from the north, and a dark passage leads west.");

room1.s_to = room2;
room2.n_to = room1;

const sword = new Entity("sword", "a sword", "It's a shiny little sword");

room2.add(sword);

const player = new Player();
player.loc = room1;

function print_cant_go() {
    print("<p>You can't go that way.");
}

function handle_look() {
    print(player.loc.get_full_desc());

    if (player.loc.contents.length != 0) {
        print("You also see:");
        for (const e of player.loc.contents) {
            print(`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${e.short_desc}`);
        }
    }
}

function handle_south() {
    if (player.loc.s_to) {
        player.loc = player.loc.s_to;
        handle_look();
    } else
        print_cant_go();
}

function handle_north() {
    if (player.loc.n_to) {
        player.loc = player.loc.n_to;
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

