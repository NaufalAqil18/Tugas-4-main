"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var DB = /** @class */ (function () {
    function DB(database) {
        this.database = database;
    }
    // Membaca database JSON
    DB.prototype.readDatabase = function () {
        try {
            var data = fs.readFileSync(this.database, "utf8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    };
    // Menulis ke database JSON
    DB.prototype.writeDatabase = function (data) {
        fs.writeFileSync(this.database, JSON.stringify(data, null, 2), "utf8");
    };
    // Menampilkan semua item
    DB.prototype.lihatSemuaItem = function () {
        return this.readDatabase();
    };
    // Menampilkan detail satu item
    DB.prototype.lihatSatuItem = function (id) {
        var items = this.readDatabase();
        return items.find(function (i) { return i.id === id; }) || null;
    };
    // Menambahkan item baru
    DB.prototype.tambahItem = function (nama, harga, stok) {
        var items = this.readDatabase();
        // Generate ID baru (ID tertinggi + 1)
        var newId = items.length > 0
            ? Math.max.apply(Math, items.map(function (item) { return item.id; })) + 1
            : 1;
        var newItem = {
            id: newId,
            nama: nama,
            harga: harga,
            stok: stok
        };
        items.push(newItem);
        this.writeDatabase(items);
        return newItem;
    };
    // Mengupdate item yang sudah ada
    DB.prototype.updateItem = function (id, nama, harga, stok) {
        var items = this.readDatabase();
        var index = items.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        // Update item
        var updatedItem = {
            id: id,
            nama: nama,
            harga: harga,
            stok: stok
        };
        items[index] = updatedItem;
        this.writeDatabase(items);
        return updatedItem;
    };
    // Menghapus item
    DB.prototype.hapusItem = function (id) {
        var items = this.readDatabase();
        var index = items.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return null; // Item tidak ditemukan
        }
        // Simpan item yang akan dihapus
        var deletedItem = items[index];
        // Hapus item dari array
        items.splice(index, 1);
        this.writeDatabase(items);
        return deletedItem;
    };
    return DB;
}());
exports.default = DB;
