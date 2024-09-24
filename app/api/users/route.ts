import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function POST(request: Request) {
  const { name, npub } = await request.json();

  if (!name || !npub) {
    return NextResponse.json({ error: 'Name and npub are required' }, { status: 400 });
  }

  const client = new MongoClient(uri as string);

  try {
    await client.connect();
    const database = client.db('wild-sats');
    const users = database.collection('users');

    const result = await users.updateOne(
      { npub: npub },
      { $set: { name: name, npub: npub } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error saving user to database:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  } finally {
    await client.close();
  }
}