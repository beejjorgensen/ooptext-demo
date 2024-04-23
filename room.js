export class Room {
    constructor(short_desc, desc) {
        this.short_desc = short_desc;
        this.desc = desc;
        this.contents = [];
    }

    get_full_desc() {
        return `<p><b>${this.short_desc}</b><br>${this.desc}`;
    }

    add(entity) {
        this.contents.push(entity);
    }

    remove(entity) {
        const index = this.contents.indexOf(entity);

        if (index == -1)
            throw "tried to remove unadded entity";

        this.contents.splice(index, 1);
    }
}

