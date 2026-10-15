export const prerender = false;

import type { APIRoute } from 'astro';
import { notion, NOTION_DATABASE_ID } from '../../lib/notion';

/**
 * GET /api/get-stories
 * Mengambil cerita-cerita pembaca dari Notion Database yang bertag "Cerita Pembaca".
 * Mengembalikan array cerita yang sudah di-format untuk ditampilkan di frontend.
 */
export const GET: APIRoute = async () => {
  try {
    if (!NOTION_DATABASE_ID) {
      return new Response(
        JSON.stringify({ stories: [], error: 'Database Notion belum diatur.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Deteksi nama kolom secara dinamis (toleran terhadap tittle/title, dll.)
    const db = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
    const propKeys = Object.keys(db.properties || {});

    const titleCol = propKeys.find((k) => k.toLowerCase() === 'title' || k.toLowerCase() === 'tittle') || 'tittle';
    const tagsCol = propKeys.find((k) => k.toLowerCase() === 'tags');
    const dateCol = propKeys.find((k) => k.toLowerCase() === 'date');
    const excerptCol = propKeys.find((k) => k.toLowerCase() === 'excerpt');

    // Query database: ambil entri dengan tag "Cerita Pembaca", urutkan dari terbaru
    const queryOptions: any = {
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: 20,
    };

    // Tambah filter tag jika kolom tags ditemukan
    if (tagsCol) {
      queryOptions.filter = {
        property: tagsCol,
        multi_select: {
          contains: 'Cerita Pembaca',
        },
      };
    }

    const response = await notion.databases.query(queryOptions);

    const stories = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties || {};

        // Ambil judul
        const titleProp = props[titleCol];
        const rawTitle =
          titleProp?.title?.[0]?.text?.content ||
          titleProp?.title?.[0]?.plain_text ||
          'Anonim';

        // Parse nama dan usia bayi dari format "[Cerita Pembaca] Nama (Usia)"
        let name = rawTitle;
        let babyAge = 'Bayi';
        const match = rawTitle.match(/\[Cerita Pembaca\]\s*(.+?)\s*\((.+?)\)/);
        if (match) {
          name = match[1].trim();
          babyAge = match[2].trim();
        }

        // Ambil excerpt jika ada
        let excerpt = '';
        if (excerptCol && props[excerptCol]) {
          excerpt =
            props[excerptCol]?.rich_text?.[0]?.text?.content ||
            props[excerptCol]?.rich_text?.[0]?.plain_text ||
            '';
        }

        // Ambil tanggal
        let date = '';
        if (dateCol && props[dateCol]) {
          date = props[dateCol]?.date?.start || '';
        }

        // Jika belum ada excerpt, ambil konten blok pertama dari halaman
        if (!excerpt) {
          try {
            const blocks = await notion.blocks.children.list({
              block_id: page.id,
              page_size: 5,
            });
            for (const block of blocks.results as any[]) {
              if (block.type === 'paragraph' && block.paragraph?.rich_text?.length > 0) {
                excerpt = block.paragraph.rich_text
                  .map((t: any) => t.plain_text || t.text?.content || '')
                  .join('');
                break;
              }
            }
          } catch {
            // Abaikan jika gagal mengambil blok
          }
        }

        return {
          id: page.id,
          name,
          babyAge,
          story: excerpt,
          date: date || page.created_time?.split('T')[0] || '',
        };
      })
    );

    // Filter cerita yang memang punya konten
    const validStories = stories.filter((s) => s.story && s.story.trim().length > 0);

    return new Response(
      JSON.stringify({ success: true, stories: validStories }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=60', // Cache 1 menit
        },
      }
    );
  } catch (error: any) {
    console.error('Error saat mengambil cerita dari Notion:', error);
    return new Response(
      JSON.stringify({ stories: [], error: error.message || 'Gagal mengambil cerita.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
