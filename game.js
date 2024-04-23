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

const list_indent = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

function print_cant_go() {
    print("<p>You can't go that way.");
}

function handle_look() {
    print(player.loc.get_full_desc());

    if (player.loc.contents.length != 0) {
        print("You also see:");
        for (const e of player.loc.contents) {
            print(`${list_indent}${e.short_desc}`);
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

function handle_take(words) {
    const direct_obj = words[1];

    let found_item = null;

    for (const i of player.loc.contents) {
        if (i.name == direct_obj)
            found_item = i;
    }

    if (found_item === null) {
        print(`<p>I don't see that here.`);
        return;
    }

    player.loc.remove(found_item);
    player.add(found_item);

    print("<p>Taken.");
}

function handle_drop(words) {
    const direct_obj = words[1];

    let found_item = null;

    for (const i of player.contents) {
        if (i.name == direct_obj)
            found_item = i;
    }

    if (found_item === null) {
        print(`<p>You don't appear to be carrying that.`);
        return;
    }

    player.remove(found_item);
    player.loc.add(found_item);

    print("<p>Dropped.");
}

function handle_inventory() {
    print("You are currently carrying:");

    if (player.contents.length == 0) {
        print(`${list_indent}Nothing!`);
        return;
    }

    for (const e of player.contents) {
        print(`${list_indent}${e.short_desc}`);
    }
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
        'drop': handle_drop,
        'i': handle_inventory,
        'inventory': handle_inventory,
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

