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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_operation_1 = __importDefault(require("./db_operation"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const database = new db_operation_1.default("./database.json");
app.use(express_1.default.json());
// Add static file middleware to serve files from public directory
app.use(express_1.default.static(path.join(__dirname, "public")));
// Add root route to serve the HTML interface
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
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
app.get("/items", (req, res) => {
    const items = database.lihatSemuaItem();
    res.json({ data: items, status: "success" });
});
// Menampilkan detail item berdasarkan ID
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = database.lihatSatuItem(id);
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
app.post("/items", (req, res) => {
    // PERBAIKAN: Mengambil data dari body dengan benar
    const { nama, harga, stok } = req.body;
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
    const id = parseInt(req.params.id);
    const { nama, harga, stok } = req.body;
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
    }
    else {
        res.status(404).json({
            message: "Item tidak ditemukan",
            status: "error"
        });
    }
});
// Menghapus item berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedItem = database.hapusItem(id);
    if (deletedItem) {
        res.json({
            message: "Produk berhasil dihapus",
            data: deletedItem,
            status: "success"
        });
    }
    else {
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
