"use client";
import React, { useState, useEffect } from "react";
import * as nostr from 'nostr-tools';
import NDK from "@nostr-dev-kit/ndk";
import { IconCopy } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/useStore";
// Define the type for the Nostr window object
type NostrWindow = Window & {
  nostr?: {
    getPublicKey(): Promise<string>;
    signEvent(event: nostr.Event): Promise<nostr.Event>;
    getRelays?(): Promise<{ [url: string]: { read: boolean; write: boolean } }>;
    nip04?: {
      encrypt(pubkey: string, plaintext: string): Promise<string>;
      decrypt(pubkey: string, ciphertext: string): Promise<string>;
    };
  };
};

let ndk: NDK | null = null;

async function initializeNDK() {
  if (!ndk) {
    ndk = new NDK({
      explicitRelayUrls: [
        'wss://relay.damus.io',
        'wss://relay.snort.social',
        'wss://nostr.build',
        'wss://nostr.wine',
        'wss://nostr.mom',
        'wss://nostr.guru',
        'wss://nostr.zebedee.cloud',
        'wss://nostr.mutiny.nz',
        'wss://nostr.openchain.fr',
        'wss://nostr.nostr.build',
        'wss://nostr.nostr.land',
        'wss://nostr.nostr.re',
      ],
    });
    await ndk.connect();
  }
}

const LoginNostr = () => {
    const { user, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    initializeNDK();
  }, []);

  const handleLogin = async () => {
    const nostrWindow = window as NostrWindow;
    if (!nostrWindow.nostr) {
      alert("Nostr extension not found. Please install a Nostr extension.");
      return;
    }

    try {
      const publicKey = await nostrWindow.nostr.getPublicKey();
      const npub = nostr.nip19.npubEncode(publicKey);

      if (!ndk) {
        throw new Error("NDK not initialized");
      }

      const ndkUser = ndk.getUser({ pubkey: publicKey });
      await ndkUser.fetchProfile();

      const loggedInUser = {
        publicKey: publicKey,
        npub: npub,
        name: ndkUser.profile?.name || `Nostr User (${npub.slice(0, 8)}...)`,
        profilePic: ndkUser.profile?.image || `https://robohash.org/${publicKey}`,
      };

      // Save user to database
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: loggedInUser.name,
          npub: loggedInUser.npub,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user to database');
      }

      setUser(loggedInUser);
      router.refresh(); // Refresh the page to update server-side components
    } catch (error) {
      console.error("Error during Nostr login:", error);
      alert("Failed to login with Nostr. Please try again.");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const copyNpub = () => {
    if (user?.npub) {
      navigator.clipboard.writeText(user.npub);
      alert("Npub copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <button 
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Nostr
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <Image 
            src={user.profilePic} 
            alt="Profile" 
            width={16}
            height={16}
            className="w-16 h-16 rounded-full mb-2"
          />
          <div className="font-bold text-lg">{user.name}</div>
          <button 
            onClick={copyNpub}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded mt-1"
          >
            <span className="mr-2">{user.npub.slice(0, 8)}...</span>
            <IconCopy size={16} />
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginNostr;