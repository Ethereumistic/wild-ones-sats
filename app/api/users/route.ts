import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function POST(request: Request) {
  const { name, npub, characters, weapons } = await request.json();

  if (!name || !npub) {
    return NextResponse.json({ error: 'Name and npub are required' }, { status: 400 });
  }

  const client = new MongoClient(uri as string, {
    serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    socketTimeoutMS: 10000, // Increase socket timeout to 10 seconds
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');
    
    const database = client.db('wild-sats');
    const users = database.collection('users');

    console.log('Updating user in database...');
    const result = await users.updateOne(
      { npub: npub },
      { $set: { name: name, npub: npub, characters: characters, weapons: weapons } },
      { upsert: true }
    );

    console.log('User updated in database');
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error saving user to database:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  } finally {
    console.log('Closing MongoDB connection');
    await client.close();
  }
}