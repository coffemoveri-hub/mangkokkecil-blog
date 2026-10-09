# 🥣 MangkokKecil - Website Blog & Edukasi MPASI Modern

Selamat datang di repository resmi **MangkokKecil**! Website blog profesional, ramah SEO, berkecepatan tinggi, dan berdesain *Clean & Playful Minimalis Organik* yang dirancang khusus untuk mendampingi ibu muda dalam memberikan nutrisi MPASI terbaik bagi si Kecil usia 4–24 bulan.

Website ini dibangun menggunakan teknologi modern:
- ⚡ **Framework**: Astro v4+ (Static Site Generation - Super Cepat)
- 🎨 **Styling**: Tailwind CSS (Desain Organik + Dark & Light Mode)
- 📝 **Headless CMS**: Notion API (Mudah menulis artikel layaknya mengetik dokumen biasa)
- 🚀 **Deployment**: GitHub + Vercel
- 🔍 **SEO**: 100% Technical & On-Page SEO (Schema.org JSON-LD, Breadcrumbs, Sitemap XML, OpenGraph)

---

## 📑 Daftar Isi
1. [Panduan Lengkap Setup Notion CMS (Untuk Pemula)](#1-panduan-lengkap-setup-notion-cms-untuk-pemula)
2. [Cara Menjalankan Website di Komputer Lokal](#2-cara-menjalankan-website-di-komputer-lokal)
3. [Cara Menyimpan Kode ke GitHub](#3-cara-menyimpan-kode-ke-github)
4. [Cara Deploy Otomatis ke Vercel & Setting Environment Variables](#4-cara-deploy-otomatis-ke-vercel--setting-environment-variables)
5. [Struktur Folder Project](#5-struktur-folder-project)

---

## 1. Panduan Lengkap Setup Notion CMS (Untuk Pemula)

Anda tidak perlu paham database teknis! Notion berfungsi sebagai tempat Anda menulis artikel blog. Setiap kali Anda mempublikasikan artikel di Notion, website akan mengambil datanya secara otomatis.

### Langkah A: Buat Integrasi Notion (Mendapatkan `NOTION_TOKEN`)
1. Buka browser dan kunjungi: **[https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)**
2. Klik tombol **`+ New integration`** (Integrasi Baru).
3. Isi kolom:
   - **Name**: Beri nama `MangkokKecil CMS`
   - **Associated workspace**: Pilih workspace Notion Anda.
   - **Capabilities**: Centang bagian *Read content* (dan Read user information).
4. Klik **Submit**.
5. Anda akan melihat **Internal Integration Secret** (diawali dengan kata `secret_...`).
6. Klik **Show** lalu **Copy**. Simpan kode ini, inilah **`NOTION_TOKEN`** Anda!

---

### Langkah B: Buat Database di Notion
1. Buka Notion Anda, buat halaman baru bertipe **Table - Full Page** atau buat Database baru.
2. Beri judul database, misalnya: `Blog MangkokKecil`.
3. Buat kolom (properties) dengan nama dan tipe data **persis** seperti tabel di bawah ini:

| Nama Kolom (Property Name) | Tipe Kolom (Property Type) | Keterangan & Contoh Isi |
| :--- | :--- | :--- |
| **`Title`** | **Title** (Bawaan) | Judul artikel (Contoh: *Panduan Resep Puree Pertama Bayi 6 Bulan*) |
| **`Slug`** | **Rich Text** | URL ramah SEO tanpa spasi (Contoh: `resep-puree-pertama-bayi-6-bulan`) |
| **`Status`** | **Select** | Pilihan opsi: `Published` dan `Draft`. *(Hanya artikel `Published` yang muncul di web)* |
| **`Date`** | **Date** | Tanggal publikasi artikel |
| **`Tags`** | **Multi-select** | Kategori topik: `Resep MPASI`, `GTM`, `Bayi 6 Bulan`, `Nutrisi`, `Review Alat`, `Pola Asuh`, `Kesehatan Bayi` |
| **`Excerpt`** | **Rich Text** | Ringkasan singkat artikel untuk preview & meta description Google (maksimal 160 karakter) |
| **`Cover`** | **Files & media** | Upload gambar sampul artikel berkualitas |

---

### Langkah C: Hubungkan Database dengan Integrasi Anda
Agar website diizinkan membaca isi database Notion:
1. Buka database Notion yang baru Anda buat.
2. Di pojok kanan atas layar Notion, klik ikon titik tiga (**`...`**).
3. Gulir ke bawah dan klik menu **Connections** (atau **Add connections**).
4. Cari dan pilih integrasi **`MangkokKecil CMS`** yang Anda buat di Langkah A.
5. Klik **Confirm / Access Granted**.

---

### Langkah D: Dapatkan `NOTION_DATABASE_ID`
1. Lihat tautan (URL) halaman database Notion Anda di address bar browser. Formatnya seperti ini:
   ```text
   https://www.notion.so/myworkspace/a1b2c3d4e5f6789012345678abcdef01?v=...
   ```
2. ID Database adalah 32 karakter alfanumerik yang berada **setelah nama workspace/ dan sebelum tanda tanya (`?v=`)**.
   - Contoh: `a1b2c3d4e5f6789012345678abcdef01`
3. Salin 32 karakter tersebut. Inilah **`NOTION_DATABASE_ID`** Anda!

---

## 2. Cara Menjalankan Website di Komputer Lokal

> 💡 **Catatan Menenangkan**: Jika Anda belum sempat mengatur Notion sekarang, **website ini sudah dilengkapi dengan 5 artikel contoh (fallback data)** sehingga langsung bisa dibuka dan dicoba!

1. Buka terminal atau Command Prompt di folder project `Blog latihan`.
2. Salin file template lingkungan:
   ```bash
   copy .env.example .env
   ```
3. Buka file `.env` menggunakan text editor (seperti VS Code atau Notepad), lalu masukkan kredensial yang Anda dapatkan:
   ```env
   NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NOTION_DATABASE_ID=a1b2c3d4e5f6789012345678abcdef01
   ```
4. Install paket dependensi (jika belum):
   ```bash
   npm install
   ```
5. Jalankan server lokal:
   ```bash
   npm run dev
   ```
6. Buka browser dan akses:
   👉 **`http://localhost:4321`**

---

## 3. Cara Menyimpan Kode ke GitHub

1. Buat akun di **[https://github.com](https://github.com)** jika belum punya.
2. Klik tombol **`New Repository`** di GitHub:
   - Nama Repository: `mangkokkecil-blog`
   - Pilih **Public** atau **Private**
   - Jangan centang opsi "Initialize with README"
   - Klik **Create repository**.
3. Buka terminal di folder project komputer Anda, lalu jalankan perintah berikut secara berurutan:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi website blog MangkokKecil"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/mangkokkecil-blog.git
   git push -u origin main
   ```
   *(Ganti `USERNAME-ANDA` dengan username GitHub Anda).*

---

## 4. Cara Deploy Otomatis ke Vercel & Setting Environment Variables

Website Anda akan langsung online gratis di internet dengan alamat seperti `https://mangkokkecil.vercel.app`!

1. Kunjungi **[https://vercel.com](https://vercel.com)** dan login menggunakan akun GitHub Anda.
2. Klik tombol **`Add New...`** -> **`Project`**.
3. Pilih repository `mangkokkecil-blog` yang sudah Anda upload, lalu klik **Import**.
4. Di bagian **Environment Variables** (Sangat Penting):
   - Kolom **Key**: `NOTION_TOKEN`
     - Kolom **Value**: *(Masukkan secret token Notion Anda)*
     - Klik **Add**.
   - Kolom **Key**: `NOTION_DATABASE_ID`
     - Kolom **Value**: *(Masukkan 32 karakter ID database Notion Anda)*
     - Klik **Add**.
5. Klik tombol biru **`Deploy`**.
6. Tunggu sekitar 1–2 menit hingga muncul kembang api ucapan selamat! Website Anda sudah resmi meluncur ke seluruh dunia! 🎉

Setiap kali Anda menulis artikel baru di Notion, cukup lakukan trigger rebuild di Vercel atau buat webhook agar update otomatis.

---

## 5. Struktur Folder Project

```text
/
├── public/
│   ├── favicon.svg             # Ikon logo mangkok MPASI ceria
│   └── robots.txt              # Konfigurasi indexing Google & Sitemap
├── src/
│   ├── components/
│   │   ├── Navbar.astro        # Navigasi sticky, logo, & Dark Mode Toggle
│   │   ├── Footer.astro        # Informasi brand, disclaimer medis, & link
│   │   ├── Hero.astro          # Hero section dengan Single H1 & CTA
│   │   ├── BlogCard.astro      # Kartu artikel responsif, lazy-image, & tags
│   │   ├── SEO.astro           # Technical & On-Page SEO (JSON-LD Article & Org)
│   │   └── Breadcrumbs.astro   # Navigasi jejak remah ramah SEO
│   ├── layouts/
│   │   └── Layout.astro        # Layout kerangka dasar halaman
│   ├── lib/
│   │   └── notion.ts           # Koneksi Notion API, block parser, & fallback data
│   ├── pages/
│   │   ├── index.astro         # Halaman Utama (Hero, 3 Poin Unggulan, GTM CTA)
│   │   ├── about.astro         # Halaman Tentang Kami & 3 Profil Ibu
│   │   ├── panduan.astro       # Panduan Tekstur Usia & Feeding Rules IDAI
│   │   ├── 404.astro           # Halaman 404 ramah pengguna
│   │   └── blog/
│   │       ├── index.astro     # Daftar semua artikel dengan filter & search
│   │       └── [slug].astro    # Detail artikel Notion + 3 Artikel Terkait
│   └── styles/
│       └── global.css          # Pengaturan font Google, warna, & prose Notion
├── astro.config.mjs            # Konfigurasi Astro, Tailwind, & Sitemap
├── tailwind.config.mjs         # Palet warna brand MangkokKecil & tipografi
├── tsconfig.json               # Konfigurasi TypeScript
├── package.json                # Daftar paket library
├── .env.example                # Contoh template environment variables
└── README.md                   # Panduan dokumentasi ini
```

---

## 💡 Fitur Unggulan MangkokKecil
- ✅ **100% SEO Friendly**: Dilengkapi Schema.org `Article`, `Organization`, dan `BreadcrumbList` untuk memaksimalkan ranking di Google Search.
- ✅ **Clean & Playful Minimalis Organik**: Palet warna alami (`#A3B18A`, `#FF9F1C`, `#FDF6EC`, `#333333`) yang menenangkan bagi para ibu.
- ✅ **Dark & Light Mode**: Nyaman dibaca saat malam hari mendampingi si Kecil tidur.
- ✅ **Performa Kilat**: Gambar otomatis menggunakan `loading="lazy"` dengan alt text deskriptif.

Dibuat dengan ❤️ untuk mendukung tumbuh kembang anak Indonesia.
