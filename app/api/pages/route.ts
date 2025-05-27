import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DATA_FILE = path.join(process.cwd(), 'data', 'pages.json');

// Ensure the pages data file exists
async function ensurePagesData() {
  try {
    await fs.access(PAGES_DATA_FILE);
  } catch {
    // Create initial pages data
    const initialPages = [
      {
        id: 'home',
        slug: '',
        title: 'Home',
        content: 'Welcome to our website!',
        metaDescription: 'Welcome to our website - your one-stop destination for all your needs.',
      },
      {
        id: 'about',
        slug: 'about',
        title: 'About Us',
        content: 'Learn more about our company and mission.',
        metaDescription: 'Discover our story, mission, and the team behind our success.',
      },
      {
        id: 'contact',
        slug: 'contact',
        title: 'Contact',
        content: 'Get in touch with us.',
        metaDescription: 'Contact us for any inquiries or support.',
      },
    ];
    await fs.writeFile(PAGES_DATA_FILE, JSON.stringify(initialPages, null, 2));
  }
}

export async function GET() {
  try {
    await ensurePagesData();
    const data = await fs.readFile(PAGES_DATA_FILE, 'utf-8');
    const pages = JSON.parse(data);
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
} 