export const prerender = false;

import type { APIRoute } from 'astro';
import { notion, NOTION_DATABASE_ID } from '../../lib/notion';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, babyAge, story } = data;

    if (!name || !story) {
      return new Response(
        JSON.stringify({ error: 'Nama dan cerita resep wajib diisi.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!NOTION_DATABASE_ID) {
      return new Response(
        JSON.stringify({ error: 'Database Notion belum diatur.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const titleText = `[Cerita Pembaca] ${name.trim()} (${babyAge ? babyAge.trim() : 'Bayi'})`;
    const snippet = story.trim().length > 150 ? story.trim().slice(0, 147) + '...' : story.trim();
    const today = new Date().toISOString().split('T')[0];

    // Deteksi nama kolom di Notion secara dinamis (toleran terhadap tittle/title, status, dll.)
    const db = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
    const propKeys = Object.keys(db.properties || {});

    const titleCol = propKeys.find((k) => k.toLowerCase() === 'title' || k.toLowerCase() === 'tittle') || 'tittle';
    const statusCol = propKeys.find((k) => k.toLowerCase() === 'status');
    const dateCol = propKeys.find((k) => k.toLowerCase() === 'date');
    const tagsCol = propKeys.find((k) => k.toLowerCase() === 'tags');
    const excerptCol = propKeys.find((k) => k.toLowerCase() === 'excerpt');

    const properties: any = {
      [titleCol]: {
        title: [
          {
            text: {
              content: titleText,
            },
          },
        ],
      },
    };

    if (statusCol) {
      properties[statusCol] = {
        select: {
          name: 'Draft',
        },
      };
    }

    if (dateCol) {
      properties[dateCol] = {
        date: {
          start: today,
        },
      };
    }

    if (tagsCol) {
      properties[tagsCol] = {
        multi_select: [
          {
            name: 'Cerita Pembaca',
          },
        ],
      };
    }

    if (excerptCol) {
      properties[excerptCol] = {
        rich_text: [
          {
            text: {
              content: snippet,
            },
          },
        ],
      };
    }

    // Buat halaman baru di Notion Database
    const newPage = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties,
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                text: {
                  content: `Resep Penyelamat & Pengalaman dari ${name.trim()}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: story.trim(),
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'callout',
          callout: {
            icon: {
              type: 'emoji',
              emoji: '🥣',
            },
            rich_text: [
              {
                text: {
                  content: `Dikirim dari formulir website MangkokKecil pada ${today}. Usia anak: ${babyAge || 'Tidak dicantumkan'}.`,
                },
              },
            ],
          },
        },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Cerita berhasil disimpan ke Notion!',
        id: newPage.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error saat menyimpan cerita ke Notion:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Gagal menyimpan cerita ke Notion.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
