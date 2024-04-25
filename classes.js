export class Container {
    constructor() {
        this.contents = [];
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

export class Player extends Container {
    constructor() {
        super();
        this.loc = undefined;
    }
}

export class Room extends Container {
    constructor(short_desc, desc) {
        super();
        this.short_desc = short_desc;
        this.desc = desc;
    }

    get_full_desc() {
        return `<p><b>${this.short_desc}</b><br>${this.desc}`;
    }
}

export class Entity {
    constructor(name, short_desc, desc) {
        this.name = name;
        this.short_desc = short_desc;
        this.long_desc = desc;
    }
}
