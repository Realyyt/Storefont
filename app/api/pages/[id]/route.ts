import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DATA_FILE = path.join(process.cwd(), 'data', 'pages.json');

async function readPagesData() {
  try {
    const data = await fs.readFile(PAGES_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePagesData(data: any[]) {
  await fs.writeFile(PAGES_DATA_FILE, JSON.stringify(data, null, 2));
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const pages = await readPagesData();
    const pageIndex = pages.findIndex((page: any) => page.id === params.id);

    if (pageIndex === -1) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    pages[pageIndex] = {
      ...pages[pageIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await writePagesData(pages);
    return NextResponse.json(pages[pageIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
} 