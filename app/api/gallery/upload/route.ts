import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const GALLERY_DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string || 'Untitled';
    const description = formData.get('description') as string || '';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Ensure gallery directory exists
    await fs.mkdir(GALLERY_DIR, { recursive: true });

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(GALLERY_DIR, fileName);

    // Convert File to Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    // Read existing gallery data
    let images = [];
    try {
      const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
      images = JSON.parse(data);
    } catch {
      // File doesn't exist or is invalid, start with empty array
    }

    // Add new image to gallery data
    const newImage = {
      id: uuidv4(),
      url: `/gallery/${fileName}`,
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    images.push(newImage);
    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(images, null, 2));

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 