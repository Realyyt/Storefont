import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const GALLERY_DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

// Ensure the gallery directory exists
async function ensureGalleryDir() {
  try {
    await fs.access(GALLERY_DIR);
  } catch {
    await fs.mkdir(GALLERY_DIR, { recursive: true });
  }
}

// Ensure the gallery data file exists
async function ensureGalleryData() {
  try {
    await fs.access(GALLERY_DATA_FILE);
  } catch {
    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify([]));
  }
}

export async function GET() {
  try {
    await ensureGalleryData();
    const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
    const images = JSON.parse(data);
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
} 