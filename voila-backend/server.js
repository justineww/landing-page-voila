const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer"); // TAMBAHAN: Untuk handle upload file
const path = require("path"); // TAMBAHAN: Untuk urusan path/lokasi folder

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// TAMBAHAN: Membuat folder uploads bisa diakses oleh React untuk menampilkan gambar
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voila_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal menyambung ke database:", err);
  } else {
    console.log("✅ Mantap! Berhasil menyambung ke database voila_db!");
  }
});

// --- KONFIGURASI MULTER (PENYIMPANAN GAMBAR) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Gambar akan disimpan di folder "public/uploads" di dalam folder backend
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    // Mengubah nama file agar unik (menambahkan angka timestamp di depannya)
    // Contoh: 16987654321-kursi_jati.jpg
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// --- JALUR API (ENDPOINT) ---

// 1. API Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Terjadi kesalahan server" });

    if (results.length > 0) {
      res.json({ success: true, message: "Login Berhasil!" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Username atau Password salah!" });
    }
  });
});

// 2. API Tambah Produk (Gallery)
// upload.single("image") artinya kita menerima 1 file dengan nama field "image" dari React
app.post("/api/products", upload.single("image"), (req, res) => {
  // Jika admin lupa upload gambar
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Gambar harus diupload!" });
  }

  // Mengambil data teks yang dikirim dari form Admin Panel
  const { product_code, title, category, sub_category, description } = req.body;

  // Mengambil nama file gambar yang baru saja disimpan oleh multer
  const image_url = req.file.filename;

  // Menyimpan semuanya ke database MySQL
  const sql = `INSERT INTO products (product_code, title, category, sub_category, image_url, description) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [product_code, title, category, sub_category, image_url, description],
    (err, result) => {
      if (err) {
        console.error("Error SQL:", err);
        // Cek jika error karena kode produk ganda (UNIQUE)
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ success: false, message: "Kode Barang sudah dipakai!" });
        }
        return res.status(500).json({
          success: false,
          message: "Gagal menyimpan data ke database.",
        });
      }

      res.json({
        success: true,
        message: "Produk berhasil ditambahkan ke Gallery!",
      });
    },
  );
});

// 3. API Ambil Semua Produk (Untuk ditampilkan di Tabel)
app.get("/api/products", (req, res) => {
  // Mengambil semua data produk dari yang paling baru (ORDER BY id DESC)
  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil data:", err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal mengambil data" });
    }
    res.json({ success: true, data: results });
  });
});

// ==========================================
// API UNTUK HALAMAN HOME (home_contents)
// ==========================================

// 1. Ambil Semua Data Home
app.get("/api/home-contents", (req, res) => {
  const sql = "SELECT * FROM home_contents";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil data home:", err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal mengambil data" });
    }
    res.json({ success: true, data: results });
  });
});

// 2. Update Data Home (Bisa Teks atau Gambar)
// Kita menggunakan upload.single("image") dari Multer yang sudah kamu buat sebelumnya
app.post("/api/home-contents/update", upload.single("image"), (req, res) => {
  const { content_type, text_value } = req.body;

  if (!content_type) {
    return res
      .status(400)
      .json({ success: false, message: "content_type wajib diisi!" });
  }

  let sql = "";
  let queryParams = [];

  // Jika user mengupload gambar baru
  if (req.file) {
    const imageUrl = req.file.filename;
    sql = "UPDATE home_contents SET image_url = ? WHERE content_type = ?";
    queryParams = [imageUrl, content_type];
  }
  // Jika user hanya mengupdate teks
  else if (text_value !== undefined) {
    sql = "UPDATE home_contents SET text_value = ? WHERE content_type = ?";
    queryParams = [text_value, content_type];
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Tidak ada data yang diupdate" });
  }

  db.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error("Error update data home:", err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal mengupdate data" });
    }
    res.json({ success: true, message: `Berhasil mengupdate ${content_type}` });
  });
});

// ==========================================
// API UNTUK SLIDER GAMBAR HOME (home_sliders)
// ==========================================

// 1. UPDATE: Ambil semua gambar slider (Sekarang diurutkan berdasarkan sort_order)
app.get("/api/home-sliders", (req, res) => {
  const sql =
    "SELECT * FROM home_sliders ORDER BY sort_order ASC, created_at DESC";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Gagal mengambil slider" });
    res.json({ success: true, data: results });
  });
});

// 2. TAMBAH BARU: API untuk menyimpan ulang urutan (Drag & Drop)
app.put("/api/home-sliders/reorder", async (req, res) => {
  const { reorderedItems } = req.body; // Menerima array: [{id: 1, sort_order: 0}, {id: 2, sort_order: 1}]

  if (!reorderedItems || !Array.isArray(reorderedItems)) {
    return res
      .status(400)
      .json({ success: false, message: "Data tidak valid" });
  }

  try {
    // Kita gunakan Promise.all untuk menjalankan update pada beberapa baris secara bersamaan
    const updatePromises = reorderedItems.map((item) => {
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE home_sliders SET sort_order = ? WHERE id = ?",
          [item.sort_order, item.id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        );
      });
    });

    await Promise.all(updatePromises);
    res.json({ success: true, message: "Urutan berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal update urutan:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal update urutan ke database" });
  }
});

// 3. Upload gambar slider (Bisa Multiple)
// Menggunakan upload.array("images", 10) -> Maksimal 10 gambar sekali upload
app.post("/api/home-sliders", upload.array("images", 10), (req, res) => {
  const { slider_type } = req.body;
  const files = req.files;

  if (!slider_type)
    return res
      .status(400)
      .json({ success: false, message: "slider_type wajib diisi!" });
  if (!files || files.length === 0)
    return res
      .status(400)
      .json({ success: false, message: "Tidak ada gambar yang diupload" });

  // Siapkan data untuk query bulk insert (memasukkan banyak baris sekaligus)
  // Menambahkan default sort_order 0 (atau sesuaikan) di tabel database
  const values = files.map((file) => [slider_type, file.filename]);
  const sql = "INSERT INTO home_sliders (slider_type, image_url) VALUES ?";

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error upload slider:", err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal menyimpan ke database" });
    }
    res.json({
      success: true,
      message: `Berhasil mengupload ${files.length} gambar ke ${slider_type}`,
    });
  });
});

// 4. Hapus 1 gambar slider
app.delete("/api/home-sliders/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM home_sliders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Gagal menghapus gambar" });
    res.json({ success: true, message: "Gambar berhasil dihapus" });
  });
});

// ==========================================
// API UNTUK OUR PROJECT GALLERY
// ==========================================

// 1. Ambil semua data project
app.get("/api/projects", (req, res) => {
  db.query("SELECT * FROM projects ORDER BY id DESC", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: results });
  });
});

// 2. Tambah project baru (Gambar + Judul + Info)
app.post("/api/projects", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? req.file.filename : null;

  if (!imageUrl)
    return res
      .status(400)
      .json({ success: false, message: "Gambar wajib diisi!" });

  db.query(
    "INSERT INTO projects (image_url, title, description) VALUES (?, ?, ?)",
    [imageUrl, title, description],
    (err) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: "Project berhasil ditambahkan!" });
    },
  );
});

// 3. Hapus project
app.delete("/api/projects/:id", (req, res) => {
  db.query("DELETE FROM projects WHERE id = ?", [req.params.id], (err) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: "Project berhasil dihapus!" });
  });
});

// Menyalakan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Backend berjalan di http://localhost:${PORT}`);
});
