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
    return DB;
}());
exports.default = DB;
