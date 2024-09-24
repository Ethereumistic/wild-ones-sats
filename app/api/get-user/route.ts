import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const npub = searchParams.get('npub');

  if (!npub) {
    return NextResponse.json({ error: 'Npub is required' }, { status: 400 });
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

    console.log('Fetching user from database...');
    const user = await users.findOne({ npub: npub });

    if (!user) {
      console.log('No user found');
      return NextResponse.json({ user: null });
    }

    console.log('User fetched from database:', user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  } finally {
    console.log('Closing MongoDB connection');
    await client.close();
  }
}