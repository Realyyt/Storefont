import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const GALLERY_DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

async function readGalleryData() {
  try {
    const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeGalleryData(data: any[]) {
  await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(data, null, 2));
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const images = await readGalleryData();
    const imageIndex = images.findIndex((img: any) => img.id === params.id);

    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    images[imageIndex] = {
      ...images[imageIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await writeGalleryData(images);
    return NextResponse.json(images[imageIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const images = await readGalleryData();
    const imageIndex = images.findIndex((img: any) => img.id === params.id);

    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    const image = images[imageIndex];
    const fileName = image.url.split('/').pop();
    const filePath = path.join(process.cwd(), 'public', 'gallery', fileName);

    // Delete the image file
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting image file:', error);
    }

    // Remove from gallery data
    images.splice(imageIndex, 1);
    await writeGalleryData(images);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 