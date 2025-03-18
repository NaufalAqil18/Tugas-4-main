var express = require("express");
var readline = require("readline-sync");
var DB = require("./db_operation").default;
var path = require("path");
var app = express();
var port = 3000;
var database = new DB("database.json");
app.use(express.json());
// Add static file middleware to serve files from public directory
app.use(express.static(path.join(__dirname, "public")));
// Add root route to serve the HTML interface
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// CORS middleware to allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// ROUTES
// Menampilkan semua item
app.get("/items", function (req, res) {
    var items = database.lihatSemuaItem();
    res.json({ data: items, status: "success" });
});
// Menampilkan detail item berdasarkan ID
app.get("/items/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var item = database.lihatSatuItem(id);
    if (item) {
        res.json({ data: item, status: "success" });
    }
    else {
        res.status(404).json({
            message: "Item tidak ditemukan",
            status: "error",
        });
    }
});
// Menambahkan item baru
app.post("/items", function (req, res) {
    var _a = req.body, nama = _a.number, harga = _a.harga, stok = _a.stok;
    if (!nama || !harga || !stok) {
        return res
            .status(400)
            .json({ message: "Data tidak lengkap", status: "error" });
    }
    var newItem = database.tambahItem(nama, harga, stok);
    res.status(201).json({ message: newItem, status: "success" });
});
// Mengupdate item berdasarkan ID
app.put("/items/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, nama = _a.nama, harga = _a.harga, stok = _a.stok;
    var updatedItem = database.updateItem(id, nama, harga, stok);
    res.json({ message: updatedItem, status: "success" });
});
// Menghapus item berdasarkan ID
app.delete("/items/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var deletedItem = database.hapusItem(id);
    res.json({ message: deletedItem, status: "success" });
});
// Menjalankan server
app.listen(port, function () {
    console.log("Server berjalan di http://localhost:".concat(port));
});
