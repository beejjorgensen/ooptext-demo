export class Room {
    constructor(short_desc, desc) {
        this.short_desc = short_desc;
        this.desc = desc;
    }

    get_full_desc() {
        return `<p><b>${this.short_desc}</b><br>${this.desc}<p>`;
    }
}

