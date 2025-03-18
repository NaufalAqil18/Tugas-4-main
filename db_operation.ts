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

    // Menambahkan item baru
    tambahItem(nama: string, harga: number, stok: number): Item {
        const items: Item[] = this.readDatabase();
        
        // Generate ID baru (ID tertinggi + 1)
        const newId: number = items.length > 0 
            ? Math.max(...items.map(item => item.id)) + 1 
            : 1;
        
        const newItem: Item = {
            id: newId,
            nama,
            harga,
            stok
        };
        
        items.push(newItem);
        this.writeDatabase(items);
        
        return newItem;
    }

    // Mengupdate item yang sudah ada
    updateItem(id: number, nama: string, harga: number, stok: number): Item | null {
        const items: Item[] = this.readDatabase();
        const index: number = items.findIndex(item => item.id === id);
        
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        
        // Update item
        const updatedItem: Item = {
            id,
            nama,
            harga,
            stok
        };
        
        items[index] = updatedItem;
        this.writeDatabase(items);
        
        return updatedItem;
    }

    // Menghapus item
    hapusItem(id: number): Item | null {
        const items: Item[] = this.readDatabase();
        const index: number = items.findIndex(item => item.id === id);
        
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        
        // Simpan item yang akan dihapus
        const deletedItem: Item = items[index];
        
        // Hapus item dari array
        items.splice(index, 1);
        this.writeDatabase(items);
        
        return deletedItem;
    }
}