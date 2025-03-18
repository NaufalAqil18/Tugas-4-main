import * as fs from "fs";

interface Item {
    id: number;
    nama: string;
    harga: number;
    stok: number;
}

export default class DB {
    private database: string;

    constructor(database: string) {
        this.database = database;
    }

    // Membaca database JSON
    private readDatabase(): Item[] {
        try {
            const data: string = fs.readFileSync(this.database, "utf8");
            return JSON.parse(data) as Item[];
        } catch (error) {
            return [];
        }
    }

    // Menulis ke database JSON
    private writeDatabase(data: Item[]): void {
        fs.writeFileSync(this.database, JSON.stringify(data, null, 2), "utf8");
    }

    // Menampilkan semua item
    lihatSemuaItem(): Item[] {
        return this.readDatabase();
    }

    // Menampilkan detail satu item
    lihatSatuItem(id: number): Item | null {
        const items: Item[] = this.readDatabase();
        return items.find((i) => i.id === id) || null;
    }
}
