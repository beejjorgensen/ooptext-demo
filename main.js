import { process } from "./game.js";

function initialize_io() {
    const input = document.getElementById("input");
    input.addEventListener("keypress", (ev) => {
        if (ev.key == "Enter") {
            const command = input.value;
            process(command.trim());
            input.value = "";
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    initialize_io();
});
