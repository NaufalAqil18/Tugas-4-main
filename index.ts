import express, { Application } from "express";
import readline from "readline-sync";
import DB from "./db_operation";
import * as path from 'path';

const app:Application = express()
const port: number = 3000;
const database: DB = new DB("./database.json")

interface Item {
    id: number;
    nama: string;
    harga: number;
    stok: number;
}

// Interface untuk data produk
interface ProductData {
    nama: string;
    harga: number;
    stok: number;
}

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
    const items = database.lihatSemuaItem();
    res.json({ data: items, status: "success" });
});

// Menampilkan detail item berdasarkan ID
app.get("/items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const item = database.lihatSatuItem(id);
  
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
    // PERBAIKAN: Mengambil data dari body dengan benar
    const { nama, harga, stok } = req.body as ProductData;
    
    if (!nama || !harga || !stok) {
        return res
            .status(400)
            .json({ message: "Data tidak lengkap", status: "error" });
    }

    const newItem = database.tambahItem(nama, harga, stok);
    res.status(201).json({ 
        message: "Produk berhasil ditambahkan", 
        data: newItem, 
        status: "success" 
    });
});

// Mengupdate item berdasarkan ID
app.put("/items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const { nama, harga, stok } = req.body as ProductData;
    
    if (!nama || !harga || !stok) {
        return res
            .status(400)
            .json({ message: "Data tidak lengkap", status: "error" });
    }
    
    const updatedItem = database.updateItem(id, nama, harga, stok);
    
    if (updatedItem) {
        res.json({ 
            message: "Produk berhasil diperbarui", 
            data: updatedItem, 
            status: "success" 
        });
    } else {
        res.status(404).json({ 
            message: "Item tidak ditemukan", 
            status: "error" 
        });
    }
});

// Menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const deletedItem = database.hapusItem(id);
    
    if (deletedItem) {
        res.json({ 
            message: "Produk berhasil dihapus", 
            data: deletedItem, 
            status: "success" 
        });
    } else {
        res.status(404).json({ 
            message: "Item tidak ditemukan", 
            status: "error" 
        });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
