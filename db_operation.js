"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class DB {
    constructor(database) {
        this.database = database;
    }
    // Membaca database JSON
    readDatabase() {
        try {
            const data = fs.readFileSync(this.database, "utf8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    // Menulis ke database JSON
    writeDatabase(data) {
        fs.writeFileSync(this.database, JSON.stringify(data, null, 2), "utf8");
    }
    // Menampilkan semua item
    lihatSemuaItem() {
        return this.readDatabase();
    }
    // Menampilkan detail satu item
    lihatSatuItem(id) {
        const items = this.readDatabase();
        return items.find((i) => i.id === id) || null;
    }
    // Menambahkan item baru
    tambahItem(nama, harga, stok) {
        const items = this.readDatabase();
        // Generate ID baru (ID tertinggi + 1)
        const newId = items.length > 0
            ? Math.max(...items.map(item => item.id)) + 1
            : 1;
        const newItem = {
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
    updateItem(id, nama, harga, stok) {
        const items = this.readDatabase();
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        // Update item
        const updatedItem = {
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
    hapusItem(id) {
        const items = this.readDatabase();
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        // Simpan item yang akan dihapus
        const deletedItem = items[index];
        // Hapus item dari array
        items.splice(index, 1);
        this.writeDatabase(items);
        return deletedItem;
    }
}
exports.default = DB;
