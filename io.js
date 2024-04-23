function readline_handler(resolve, _) {
    const input = document.getElementById("input");

    input.focus();

    function keypress_handler(ev) {
        if (ev.key == "Enter") {
            const command = input.value.trim();
            resolve(command);
            input.removeEventListener("keypress", keypress_handler);
            input.value = "";
        }
    }

    input.addEventListener("keypress", keypress_handler);
}

export function readline() {
    return new Promise(readline_handler);
}

export function print(s) {
    const output = document.getElementById("output");

    output.innerHTML += s;

    output.scrollTop = output.scrollHeight;
}

