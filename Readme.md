# Sistem API Minimarket

## 📝 Deskripsi

Proyek ini adalah sistem API Minimarket sederhana yang dibangun dengan Express.js. API ini menyediakan fungsionalitas untuk mengelola produk di minimarket, memungkinkan pengguna untuk mengambil data produk dan menambah, memperbarui, atau menghapus produk dalam database.

## ✨ Fitur

### Fitur Wajib

- **API yang Diimplementasikan**:
  - GET `/items` - Melihat semua produk
  - GET `/items/:id` - Melihat produk spesifik berdasarkan ID
  - POST `/items` - Menambahkan produk baru

### Fitur Tambahan

- **Antarmuka Web**: Antarmuka HTML/CSS/JS yang ramah pengguna untuk berinteraksi dengan API
- **Penyimpanan Data**: Semua data disimpan dalam file JSON yang bertindak sebagai database
- **Dukungan TypeScript**: Keamanan tipe dan pemeliharaan kode yang ditingkatkan menggunakan TypeScript
- **Dukungan CORS**: Cross-Origin Resource Sharing diaktifkan untuk aksesibilitas API
- **Metode Tambahan**: Implementasi PUT dan DELETE untuk pembaruan dan penghapusan data
- **Manajemen Stok**: Pelacakan jumlah stok produk

## 🚀 Cara Menjalankan Proyek

### Prasyarat

- Node.js (v12 atau lebih tinggi)
- npm (v6 atau lebih tinggi)

### Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/username-anda/minimarket-api.git
cd minimarket-api
```

2. Instal dependensi:

```bash
npm install
```

3. Untuk menjalankan proyek JavaScript:

```bash
node index.js
```

4. Untuk menjalankan proyek dengan TypeScript:

```bash
# Mengkompilasi TypeScript menjadi JavaScript
npx tsc

# Jalankan file JavaScript yang dihasilkan
node index.js
```

5. Buka browser Anda dan arahkan ke:

```
http://localhost:3000
```

## 📚 Dokumentasi API

### 1. Mendapatkan Semua Produk

- **URL**: `/items`
- **Metode**: GET
- **Respon**:

```json
{
  "data": [
    {
      "id": 1,
      "nama": "Beras 5kg",
      "harga": 75000,
      "stok": 10
    },
    {
      "id": 2,
      "nama": "Minyak Goreng 1L",
      "harga": 18000,
      "stok": 20
    }
  ],
  "status": "success"
}
```

### 2. Mendapatkan Produk berdasarkan ID

- **URL**: `/items/:id`
- **Metode**: GET
- **Respon**:

```json
{
  "data": {
    "id": 1,
    "nama": "Beras 5kg",
    "harga": 75000,
    "stok": 10
  },
  "status": "success"
}
```

### 3. Menambahkan Produk Baru

- **URL**: `/items`
- **Metode**: POST
- **Body Request**:

```json
{
  "nama": "Gula Pasir 1kg",
  "harga": 15000,
  "stok": 15
}
```

- **Respon**:

```json
{
  "message": {
    "id": 3,
    "nama": "Gula Pasir 1kg",
    "harga": 15000,
    "stok": 15
  },
  "status": "success"
}
```

### 4. Memperbarui Produk

- **URL**: `/items/:id`
- **Metode**: PUT
- **Body Request**:

```json
{
  "nama": "Gula Pasir 1kg",
  "harga": 16000,
  "stok": 20
}
```

- **Respon**:

```json
{
  "message": {
    "id": 3,
    "nama": "Gula Pasir 1kg",
    "harga": 16000,
    "stok": 20
  },
  "status": "success"
}
```

### 5. Menghapus Produk

- **URL**: `/items/:id`
- **Metode**: DELETE
- **Respon**:

```json
{
  "message": {
    "id": 3,
    "nama": "Gula Pasir 1kg",
    "harga": 16000,
    "stok": 20
  },
  "status": "success"
}
```

## 🛠️ Struktur Proyek

- `index.ts` / `index.js` - File server utama dengan setup Express dan route
- `db_operation.ts` / `db_operation.js` - Kelas operasi database
- `database.json` - File JSON yang berfungsi sebagai database
- `public/index.html` - Antarmuka web untuk aplikasi

## 📋 Persyaratan Proyek

1. Harus memiliki minimal 2 metode GET dan 1 metode POST
2. Bisa melihat semua item dengan GET
3. Bisa melihat 1 item dengan GET
4. Bisa menambahkan item baru dengan POST
5. Data harus:

   - Menggunakan format JSON
   - Memiliki tema (produk Minimarket dalam kasus ini)
   - Memiliki minimal 3 atribut per item (id, nama, harga, stok)

6. Kriteria bonus:
   - Menggunakan TypeScript (+10 poin)
   - Menambahkan fungsi tambahan seperti update dan delete (+10 poin)

## 👨‍💻 Kontributor

- Khalid
- Naufal
- Willy
