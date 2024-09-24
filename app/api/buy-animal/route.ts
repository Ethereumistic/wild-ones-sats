import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function POST(request: Request) {
  const { npub, animal } = await request.json();

  if (!npub || !animal) {
    return NextResponse.json({ error: 'Npub and animal are required' }, { status: 400 });
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

    console.log('Updating user characters in database...');
    const result = await users.updateOne(
      { npub: npub },
      { $addToSet: { characters: animal } } // Add the animal to the characters array
    );

    console.log('User characters updated in database');
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error updating user characters in database:', error);
    return NextResponse.json({ error: 'Failed to update user characters' }, { status: 500 });
  } finally {
    console.log('Closing MongoDB connection');
    await client.close();
  }
}