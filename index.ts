const express = require("express");
const readline = require("readline-sync");
const DB = require("./db_operation");
const path = require("path");
const app = express();
const port = 3000;
const database = new DB("database.json");

app.use(express.json());

// Add static file middleware to serve files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Add root route to serve the HTML interface
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// ROUTES
// Menampilkan semua item
app.get("/items", (req, res) => {
    const items:object = database.lihatSemuaItem();
    res.json({ data: items, status: "success" });
});

// Menampilkan detail item berdasarkan ID
app.get("/items/:id", (req, res) => {
    const id:number = parseInt(req.params.id);
    const item:object = database.lihatSatuItem(id);
  
    if (item) {
        res.json({ data: item, status: "success" });
    } else {
        res.status(404).json({
            message: "Item tidak ditemukan",
            status: "error",
        });
    }
});

// Menambahkan item baru
app.post("/items", (req, res) => {
    const { number:nama, harga, stok } = req.body;
    
    if (!nama || !harga || !stok) {
        return res
            .status(400)
            .json({ message: "Data tidak lengkap", status: "error" });
    }

    const newItem:object = database.tambahItem(nama, harga, stok);
    res.status(201).json({ message: newItem, status: "success" });
});

// Mengupdate item berdasarkan ID
app.put("/items/:id", (req, res) => {
    const id:number = parseInt(req.params.id);

    const { nama, harga, stok } = req.body;
    const updatedItem:object = database.updateItem(id, nama, harga, stok);
    res.json({ message: updatedItem, status: "success" });
});

// Menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const id:number = parseInt(req.params.id);
    const deletedItem:object = database.hapusItem(id);
    res.json({ message: deletedItem, status: "success" });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
