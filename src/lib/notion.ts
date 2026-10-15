import { Client } from '@notionhq/client';

// Inisialisasi Notion Client
const rawToken = import.meta.env.NOTION_TOKEN || process.env.NOTION_TOKEN || '';
const rawDbId = import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID || '';

// Bersihkan database ID jika pengguna memasukkan URL lengkap
export const NOTION_DATABASE_ID = rawDbId
  .replace(/.*[\/\-]/, '')
  .replace(/\?.*$/, '')
  .replace(/[^a-zA-Z0-9]/g, '');

export const notion = new Client({
  auth: rawToken.trim(),
});

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  date: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  author: string;
  readingTime: string;
  contentBlocks?: NotionBlock[];
}

export interface NotionBlock {
  type: string;
  content: string;
  extra?: {
    caption?: string;
    language?: string;
    level?: number;
  };
}

/**
 * Helper membersihkan string menjadi URL slug yang ramah SEO:
 * huruf kecil, tanpa spasi (diganti strip -), dan bebas karakter khusus.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-alphanumeric selain strip
    .replace(/\-\-+/g, '-') // Ganti multiple strip dengan satu strip
    .replace(/^-+/, '') // Hapus strip di awal
    .replace(/-+$/, ''); // Hapus strip di akhir
}

/**
 * Estimasi waktu membaca berdasarkan jumlah kata dalam teks (rata-rata 200 kata/menit)
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} menit baca`;
}

/**
 * Data Artikel Contoh (Fallback Mock Data)
 * Disediakan agar website MangkokKecil dapat langsung berjalan di localhost
 * meskipun pengguna pemula belum selesai mengatur NOTION_TOKEN dan DATABASE_ID.
 */
export const MOCK_POSTS: BlogPost[] = [
  {
    id: 'mock-post-1',
    title: 'Panduan Resep Puree Pertama Bayi 6 Bulan: Lembut, Padat Gizi & Bebas Tersedak',
    slug: 'resep-puree-pertama-bayi-6-bulan',
    status: 'Published',
    date: '2026-09-28',
    tags: ['Resep MPASI', 'Bayi 6 Bulan', 'Nutrisi'],
    excerpt: 'Langkah demi langkah membuat puree alpukat, labu kuning, dan hati ayam kaya zat besi dengan tekstur lumat yang pas sesuai anjuran IDAI untuk menu awal si Kecil.',
    coverImage: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Nutrisi MangkokKecil',
    readingTime: '4 menit baca',
    contentBlocks: [
      {
        type: 'paragraph',
        content: 'Memasuki usia 6 bulan, ASI saja tidak lagi mencukupi 100% kebutuhan energi dan nutrisi si Kecil. Inilah saatnya petualangan rasa pertama dimulai! Namun, banyak ibu baru merasa cemas: tekstur seperti apa yang aman? Bagaimana mencegah anak tersedak? Dan bahan apa yang paling utama?'
      },
      {
        type: 'heading_2',
        content: 'Kebutuhan Utama: Zat Besi dan Lemak Tambahan'
      },
      {
        type: 'paragraph',
        content: 'Berdasarkan rekomendasi IDAI (Ikatan Dokter Anak Indonesia), cadangan zat besi bayi mulai menipis di usia 6 bulan. Oleh karena itu, jangan hanya memberikan menu tunggal berupa buah atau sayur. Menu MPASI lengkap harus mengandung karbohidrat, protein hewani (seperti hati ayam atau daging sapi), dan lemak tambahan (minyak kelapa, santan, atau butter).'
      },
      {
        type: 'quote',
        content: 'Menu tunggal selama 14 hari sudah tidak lagi direkomendasikan. Berikan menu empat bintang/menu lengkap sejak hari pertama MPASI untuk mencegah malnutrisi dan stunting.'
      },
      {
        type: 'heading_2',
        content: 'Resep Puree Labu Kuning & Hati Ayam (Tinggi Zat Besi)'
      },
      {
        type: 'bulleted_list_item',
        content: '50 gram labu kuning manis, kukus hingga sangat empuk'
      },
      {
        type: 'bulleted_list_item',
        content: '30 gram hati ayam segar, cuci bersih dengan perasan jeruk nipis lalu kukus dengan jahe dan bawang putih'
      },
      {
        type: 'bulleted_list_item',
        content: '1 sendok teh extra virgin olive oil (EVOO) atau unsalted butter'
      },
      {
        type: 'bulleted_list_item',
        content: 'Sedikit kaldu ayam kampung tanpa garam/gula untuk mengatur kekentalan'
      },
      {
        type: 'heading_3',
        content: 'Aturan Tekstur yang Tepat'
      },
      {
        type: 'paragraph',
        content: 'Saring makanan menggunakan saringan kawat (bukan diblender terlalu cair). Tekstur yang ideal adalah semi-kental, tidak tumpah seketika saat sendok dimiringkan. Ini penting untuk melatih otot oromotor mulut bayi.'
      }
    ]
  },
  {
    id: 'mock-post-2',
    title: 'Trik Mengatasi Anak GTM (Gerakan Tutup Mulut) & Strategi Feeding Rules IDAI',
    slug: 'trik-mengatasi-anak-gtm-feeding-rules',
    status: 'Published',
    date: '2026-09-25',
    tags: ['GTM', 'Pola Asuh', 'Feeding Rules'],
    excerpt: 'Ibu pejuang GTM wajib tahu! Kenali penyebab anak menolak makanan, aturan waktu makan 30 menit, dan menu penyelamat tinggi kalori saat anak sedang tumbuh gigi.',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    author: 'Konselor Laktasi & MPASI',
    readingTime: '5 menit baca',
    contentBlocks: [
      {
        type: 'paragraph',
        content: 'Melihat anak memalingkan wajah, mengunci bibir rapat-rapat, atau bahkan melemparkan mangkok makanan ke lantai adalah momen yang bisa memicu tangisan bagi setiap ibu. Anda tidak sendirian, Bunda!'
      },
      {
        type: 'heading_2',
        content: 'Mengapa Anak Menolak Makan?'
      },
      {
        type: 'paragraph',
        content: 'GTM bukanlah penyakit, melainkan gejala. Beberapa penyebab umum meliputi rasa tidak lapar akibat ngemil berdekatan dengan jam makan, sedang tumbuh gigi, sariawan, bosan tekstur, atau rasa tertekan karena dipaksa.'
      },
      {
        type: 'heading_2',
        content: 'Penerapan 3 Aturan Emas Feeding Rules'
      },
      {
        type: 'bulleted_list_item',
        content: 'Jadwal Teratur: Tetapkan jadwal 3 kali makan utama dan 2 kali snack. Jangan berikan susu formula/ASI 1,5 hingga 2 jam sebelum jam makan agar anak merasakan lapar alami.'
      },
      {
        type: 'bulleted_list_item',
        content: 'Lingkungan Kondusif: Matikan televisi, singkirkan gadget, dan hindari mainan di meja makan. Anak perlu fokus melihat makanannya.'
      },
      {
        type: 'bulleted_list_item',
        content: 'Batasi Waktu 30 Menit: Selesaikan proses makan setelah 30 menit, baik makanan habis maupun belum. Jangan biarkan makan berlarut-larut hingga 1 jam karena membuat anak trauma.'
      },
      {
        type: 'quote',
        content: 'Tugas orang tua adalah menentukan APA yang disajikan dan KAPAN disajikan. Tugas anak adalah menentukan BERAPA BANYAK yang ingin ia makan.'
      }
    ]
  },
  {
    id: 'mock-post-3',
    title: 'Perbandingan Baby-Led Weaning (BLW) vs Spoon-Feeding: Mana yang Paling Tepat?',
    slug: 'perbandingan-blw-vs-spoon-feeding',
    status: 'Published',
    date: '2026-09-20',
    tags: ['Metode MPASI', 'BLW', 'Pola Asuh'],
    excerpt: 'Bedah tuntas kelebihan dan risiko metode BLW dan suap konvensional. Temukan metode yang paling sesuai dengan gaya hidup ibu bekerja maupun ibu baru.',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Editorial MangkokKecil',
    readingTime: '4 menit baca',
    contentBlocks: [
      {
        type: 'paragraph',
        content: 'Di era media sosial saat ini, metode Baby-Led Weaning (BLW) sangat populer. Bayi memegang langsung potongan brokoli kukus atau wortel dan makan sendiri. Namun, apakah metode ini benar-benar lebih superior dibandingkan metode suap konvensional (spoon-feeding)?'
      },
      {
        type: 'heading_2',
        content: 'Mengenal Spoon-Feeding (Pendekatan Responsif Tradisional)'
      },
      {
        type: 'paragraph',
        content: "Kelebihan utama spoon-feeding adalah kontrol asupan kalori dan nutrisi yang lebih terukur, terutama zat besi yang sangat krusial di usia 6-12 bulan. Kekurangannya, jika ibu tidak sabar, risiko 'memaksa' anak lebih tinggi."
      },
      {
        type: 'heading_2',
        content: 'Mengenal Baby-Led Weaning (BLW)'
      },
      {
        type: 'paragraph',
        content: 'BLW melatih kemandirian motorik halus, koordinasi tangan-mata, dan mengasah reflek mengunyah lebih cepat. Namun, risiko kekurangan asupan kalori di awal bulan serta kekacauan meja makan (food mess) memerlukan kesabaran ekstra dari orang tua.'
      },
      {
        type: 'quote',
        content: 'Solusi terbaik untuk banyak ibu adalah Metode Campuran (Responsive Feeding): kenalkan finger food lunak untuk melatih motorik, sembari tetap menyuapi puree padat nutrisi.'
      }
    ]
  },
  {
    id: 'mock-post-4',
    title: 'Review Perlengkapan MPASI: Slow Cooker vs Food Processor, Mana yang Wajib Punya?',
    slug: 'review-perlengkapan-mpasi-slow-cooker-vs-food-processor',
    status: 'Published',
    date: '2026-09-15',
    tags: ['Review Alat', 'Meal Prep', 'Ibu Bekerja'],
    excerpt: 'Ulasan jujur peralatan MPASI untuk ibu cerdas. Hemat anggaran dengan mengetahui kelebihan slow cooker keramik vs ketajaman food processor kukus.',
    coverImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
    author: 'Reviewer Perlengkapan Bayi',
    readingTime: '6 menit baca',
    contentBlocks: [
      {
        type: 'paragraph',
        content: 'Sebelum membeli puluhan gadget dapur bayi yang mahal, mari kita bedah dua alat paling populer: Slow Cooker dan Food Processor/Baby Cooker multifungsi. Mana yang paling cocok untuk kebutuhan dapur Anda?'
      },
      {
        type: 'heading_2',
        content: 'Slow Cooker: Penyelamat Ibu Bekerja'
      },
      {
        type: 'paragraph',
        content: 'Kelebihan slow cooker adalah Anda cukup memasukkan beras, daging, sayur, dan kaldu di malam hari atau subuh, nyalakan, dan bubur lembut kaya kaldu sudah matang sempurna saat pagi. Wadah pot keramik juga bebas kontaminasi kimia Teflon.'
      },
      {
        type: 'heading_2',
        content: 'Food Processor (Steamer + Blender Multifungsi)'
      },
      {
        type: 'paragraph',
        content: 'Alat ini mengukus sekaligus menghaluskan makanan dalam satu wadah. Sangat praktis untuk puree buah atau sayur segar dalam porsi kecil tanpa mengotori banyak panci.'
      },
      {
        type: 'heading_3',
        content: 'Rekomendasi Kami'
      },
      {
        type: 'paragraph',
        content: 'Jika Anda ibu bekerja yang butuh menyiapkan bubur utama dalam jumlah cukup untuk 3 kali makan harian, slow cooker 0.8L hingga 1.2L adalah investasi nomor satu dengan harga yang sangat terjangkau (Rp 150.000 - Rp 300.000).'
      }
    ]
  },
  {
    id: 'mock-post-5',
    title: 'Mencegah Anemia pada Bayi: Kenali Sumber Zat Besi & Panduan Cek Tanda Alergi MPASI',
    slug: 'mencegah-anemia-zat-besi-tanda-alergi-mpasi',
    status: 'Published',
    date: '2026-09-10',
    tags: ['Kesehatan Bayi', 'Nutrisi', 'Zat Besi'],
    excerpt: 'Panduan medis mengenali sumber zat besi hewani paling mudah diserap tubuh serta aturan 3 hari untuk mendeteksi alergi protein seperti telur dan udang.',
    coverImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    author: 'dr. Spesialis Anak Rekanan',
    readingTime: '5 menit baca',
    contentBlocks: [
      {
        type: 'paragraph',
        content: 'Anemia Defisiensi Besi (ADB) adalah ancaman nyata bagi perkembangan kognitif dan kecerdasan anak di 1000 Hari Pertama Kehidupan. Sayangnya, banyak orang tua belum mengetahui bahwa zat besi dari bayam (zat besi non-heme) sangat sulit diserap bayi dibandingkan zat besi hewani (heme).'
      },
      {
        type: 'heading_2',
        content: '3 Sumber Zat Besi Juara untuk MPASI'
      },
      {
        type: 'bulleted_list_item',
        content: 'Hati Ayam: Mengandung zat besi tertinggi, tekstur empuk dan mudah dihaluskan.'
      },
      {
        type: 'bulleted_list_item',
        content: 'Daging Sapi Giling: Pilihlah bagian yang sedikit lemak untuk asupan zat besi heme yang optimal.'
      },
      {
        type: 'bulleted_list_item',
        content: 'Ikan Kembung: Alternatif salmon yang jauh lebih segar, murah, dan kaya DHA serta zat besi.'
      },
      {
        type: 'heading_2',
        content: 'Aturan Mengenalkan Makanan Pemicu Alergi'
      },
      {
        type: 'paragraph',
        content: 'Jangan menunda pengenalan telur, ikan, atau kacang-kacangan hingga usia 1 tahun. Penelitian terbaru membuktikan pengenalan dini (sejak 6 bulan) justru mengurangi risiko alergi permanen. Gunakan aturan satu bahan baru setiap 3 hari untuk memantau ruam, muntah, atau gangguan pencernaan.'
      }
    ]
  }
];

/**
 * Helper mencari properti di Notion tanpa mempermasalahkan huruf besar/kecil (case-insensitive)
 * dan toleran terhadap variasi nama kolom (seperti 'tittle' atau 'title').
 */
function findProperty(props: any, ...candidates: string[]) {
  if (!props) return undefined;
  for (const c of candidates) {
    if (props[c]) return props[c];
  }
  const keys = Object.keys(props);
  for (const c of candidates) {
    const matched = keys.find((k) => k.toLowerCase() === c.toLowerCase());
    if (matched && props[matched]) return props[matched];
  }
  return undefined;
}

/**
 * Fetch semua artikel yang berstatus 'Published' dari Notion Database
 * Jika Notion API belum di-setup atau masih berupa baris kosong, gunakan fallback mock data.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!rawToken || !NOTION_DATABASE_ID) {
    return MOCK_POSTS;
  }

  try {
    // Ambil struktur database terlebih dahulu untuk mendeteksi nama kolom secara otomatis
    const db = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
    const propKeys = Object.keys(db.properties || {});

    // Deteksi nama kolom status & date secara case-insensitive
    const statusCol = propKeys.find((k) => k.toLowerCase() === 'status');
    const dateCol = propKeys.find((k) => k.toLowerCase() === 'date');
    const sorts = dateCol
      ? [
          {
            property: dateCol,
            direction: 'descending' as const,
          },
        ]
      : undefined;

    // Query database Notion tanpa filter select ketat di level API
    // agar tidak error jika pengguna belum sempat membuat opsi "Published" di Notion
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      ...(sorts ? { sorts } : {}),
    });

    const publishedPosts: BlogPost[] = [];

    for (const page of response.results as any[]) {
      const props = page.properties;

      // Cek status secara toleran di JavaScript
      const statusProp = findProperty(props, 'status', 'Status');
      const statusValue = statusProp?.select?.name?.toLowerCase() || '';
      
      // Hanya ambil yang berstatus 'published'
      if (statusValue !== 'published') continue;

      // Ambil Title (toleran terhadap 'tittle', 'Title', 'title')
      const titleProp = findProperty(props, 'title', 'tittle', 'Title');
      const title = titleProp?.title?.[0]?.plain_text?.trim() || '';

      // Abaikan baris kosong yang belum diisi judul artikel
      if (!title) continue;

      // Ambil Slug (jika kosong, buat otomatis dari title)
      const slugProp = findProperty(props, 'slug', 'Slug');
      const rawSlug = slugProp?.rich_text?.[0]?.plain_text?.trim() || '';
      const slug = rawSlug ? slugify(rawSlug) : slugify(title);

      // Ambil Tanggal
      const dateProp = findProperty(props, 'date', 'Date');
      const date = dateProp?.date?.start || new Date().toISOString().split('T')[0];

      // Ambil Tags
      const tagsProp = findProperty(props, 'tags', 'Tags');
      const tags = (tagsProp?.multi_select || []).map((t: any) => t.name);

      // Ambil Excerpt
      const excerptProp = findProperty(props, 'excerpt', 'Excerpt');
      const excerpt = excerptProp?.rich_text?.[0]?.plain_text || 'Panduan MPASI bergizi untuk buah hati tercinta bersama MangkokKecil.';

      // Ambil Cover Image
      let coverImage = 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80';
      if (page.cover) {
        if (page.cover.type === 'external') {
          coverImage = page.cover.external.url;
        } else if (page.cover.type === 'file') {
          coverImage = page.cover.file.url;
        }
      } else {
        const coverProp = findProperty(props, 'cover', 'Cover');
        if (coverProp?.files?.[0]) {
          const fileObj = coverProp.files[0];
          coverImage = fileObj.file ? fileObj.file.url : fileObj.external?.url || coverImage;
        }
      }

      publishedPosts.push({
        id: page.id,
        title,
        slug,
        status: 'Published',
        date,
        tags,
        excerpt,
        coverImage,
        author: 'MangkokKecil Editorial',
        readingTime: calculateReadingTime(excerpt + ' ' + title + ' konten artikel lengkap'),
      });
    }

    // Jika belum ada artikel terisi yang berstatus Published di Notion, tampilkan 5 artikel contoh
    return publishedPosts.length > 0 ? publishedPosts : MOCK_POSTS;
  } catch (error) {
    console.warn('[MangkokKecil] Gagal mengambil data dari Notion API, beralih ke Fallback Mock Data:', error);
    return MOCK_POSTS;
  }
}

/**
 * Fetch detail artikel berdasarkan slug dari Notion
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getPublishedBlogPosts();
  const matched = allPosts.find((p) => p.slug === slug);

  if (!matched) return null;

  // Jika menggunakan data mock
  if (matched.id.startsWith('mock-post-')) {
    return matched;
  }

  // Jika terkoneksi dengan Notion asli, ambil blok konten
  try {
    const blocksResponse = await notion.blocks.children.list({
      block_id: matched.id,
      page_size: 100,
    });

    const parsedBlocks: NotionBlock[] = [];
    let fullTextContent = matched.title + ' ' + matched.excerpt;

    for (const block of blocksResponse.results as any[]) {
      const type = block.type;
      let text = '';

      if (type === 'paragraph' && block.paragraph?.rich_text?.length > 0) {
        text = block.paragraph.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'paragraph', content: text });
      } else if (type === 'heading_1' && block.heading_1?.rich_text?.length > 0) {
        text = block.heading_1.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'heading_1', content: text });
      } else if (type === 'heading_2' && block.heading_2?.rich_text?.length > 0) {
        text = block.heading_2.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'heading_2', content: text });
      } else if (type === 'heading_3' && block.heading_3?.rich_text?.length > 0) {
        text = block.heading_3.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'heading_3', content: text });
      } else if (type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text?.length > 0) {
        text = block.bulleted_list_item.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'bulleted_list_item', content: text });
      } else if (type === 'numbered_list_item' && block.numbered_list_item?.rich_text?.length > 0) {
        text = block.numbered_list_item.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'numbered_list_item', content: text });
      } else if (type === 'quote' && block.quote?.rich_text?.length > 0) {
        text = block.quote.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({ type: 'quote', content: text });
      } else if (type === 'code' && block.code?.rich_text?.length > 0) {
        text = block.code.rich_text.map((rt: any) => rt.plain_text).join('');
        parsedBlocks.push({
          type: 'code',
          content: text,
          extra: { language: block.code.language },
        });
      } else if (type === 'image') {
        const imageUrl = block.image?.type === 'external' ? block.image.external.url : block.image?.file?.url;
        const caption = block.image?.caption?.[0]?.plain_text || matched.title;
        if (imageUrl) {
          parsedBlocks.push({
            type: 'image',
            content: imageUrl,
            extra: { caption },
          });
        }
      }

      fullTextContent += ' ' + text;
    }

    return {
      ...matched,
      readingTime: calculateReadingTime(fullTextContent),
      contentBlocks: parsedBlocks,
    };
  } catch (error) {
    console.error(`Gagal mengambil blok konten untuk slug ${slug}:`, error);
    return matched;
  }
}

/**
 * Mendapatkan 3 Artikel Terkait berdasarkan kecocokan Tags
 */
export async function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getPublishedBlogPosts();
  
  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      // Hitung skor kecocokan tag
      const matchedTags = post.tags.filter((t) => tags.includes(t));
      return { post, score: matchedTags.length };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}
