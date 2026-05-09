const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ─── KONEKSI DATABASE ─────────────────────────────────────────────────────────
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

// ─── KONFIGURASI MULTER ───────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ==========================================
// API LOGIN
// ==========================================

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

// ==========================================
// API PRODUCTS
// ==========================================

// 1. Ambil semua produk
app.get("/api/products", (req, res) => {
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

// 2. Tambah produk baru
app.post("/api/products", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Gambar harus diupload!" });
  }

  const { product_code, title, category, sub_category, description } = req.body;
  const image_url = req.file.filename;

  const sql = `INSERT INTO products (product_code, title, category, sub_category, image_url, description) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [product_code, title, category, sub_category, image_url, description],
    (err, result) => {
      if (err) {
        console.error("Error SQL:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ success: false, message: "Kode Barang sudah dipakai!" });
        }
        return res
          .status(500)
          .json({
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

// 3. Edit produk
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { product_code, title, category, sub_category, description } = req.body;

  let sql, params;

  if (req.file) {
    sql = `UPDATE products SET product_code=?, title=?, category=?, sub_category=?, description=?, image_url=? WHERE id=?`;
    params = [
      product_code,
      title,
      category,
      sub_category,
      description,
      req.file.filename,
      id,
    ];
  } else {
    sql = `UPDATE products SET product_code=?, title=?, category=?, sub_category=?, description=? WHERE id=?`;
    params = [product_code, title, category, sub_category, description, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error edit produk:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ success: false, message: "Kode Barang sudah dipakai!" });
      }
      return res
        .status(500)
        .json({ success: false, message: "Gagal mengupdate produk" });
    }
    res.json({ success: true, message: "Produk berhasil diperbarui!" });
  });
});

// 4. Hapus produk
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error hapus produk:", err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal menghapus produk" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }
    res.json({ success: true, message: "Produk berhasil dihapus!" });
  });
});

// ==========================================
// API HOME CONTENTS
// ==========================================

// 1. Ambil semua data home
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

// 2. Update data home (teks atau gambar)
app.post("/api/home-contents/update", upload.single("image"), (req, res) => {
  const { content_type, text_value } = req.body;

  if (!content_type) {
    return res
      .status(400)
      .json({ success: false, message: "content_type wajib diisi!" });
  }

  let sql = "";
  let queryParams = [];

  if (req.file) {
    sql = "UPDATE home_contents SET image_url = ? WHERE content_type = ?";
    queryParams = [req.file.filename, content_type];
  } else if (text_value !== undefined) {
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
// API HOME SLIDERS
// ==========================================

// 1. Ambil semua slider
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

// 2. Upload gambar slider (bisa multiple)
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

// 3. Update urutan slider (drag & drop)
app.put("/api/home-sliders/reorder", async (req, res) => {
  const { reorderedItems } = req.body;

  if (!reorderedItems || !Array.isArray(reorderedItems)) {
    return res
      .status(400)
      .json({ success: false, message: "Data tidak valid" });
  }

  try {
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

// 4. Hapus gambar slider
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
// API OUR PROJECT GALLERY
// ==========================================

// 1. Ambil semua project
app.get("/api/projects", (req, res) => {
  db.query("SELECT * FROM projects ORDER BY id DESC", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: results });
  });
});

// 2. Tambah project baru
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

// ─── JALANKAN SERVER ──────────────────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Backend berjalan di http://localhost:${PORT}`);
});
