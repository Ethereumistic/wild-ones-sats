import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconArrowRight, IconLock } from '@tabler/icons-react';
import { useStore } from '@/app/store/useStore';

export const animals = [
    {
      name: 'Dog',
      cost: 30000,
      specialAbility: 'Bone',
      specialAbilityImage: '/abilities/Dog_Bone.png',
      image: '/animals/dog.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Cat',
      cost: 30000,
      specialAbility: 'Scratch',
      specialAbilityImage: '/abilities/Cat_Scratch.png',
      image: '/animals/cat.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Rabbit',
      cost: 30000,
      specialAbility: 'Bunny Hop',
      specialAbilityImage: '/abilities/Bunny_Hop.png',
      image: '/animals/rabbit.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Dragon',
      cost: 30000,
      specialAbility: 'Dragon Breath',
      specialAbilityImage: '/abilities/Dragon_Breath.png',
      image: '/animals/dragon.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Platypus',
      cost: 30000,
      specialAbility: 'Tsunami',
      specialAbilityImage: '/abilities/Platypus_Tsunami.png',
      image: '/animals/platypus.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Bat',
      cost: 30000,
      specialAbility: 'Bat Fly',
      specialAbilityImage: '/abilities/Bat_Fly.png',
      image: '/animals/bat.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },
    {
      name: 'Panda',
      cost: 30000,
      specialAbility: 'Panda Punch',
      specialAbilityImage: '/abilities/Panda_Punch.png',
      image: '/animals/panda.png',
      stats: {
        speed: 50,
        health: 70,
        jump: 40,
        strength: 60,
      },
    },

    // Add more animals here
  ];
  
  const ShopDashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ownedAnimals, setOwnedAnimals] = useState<string[]>([]);
    const { user, setUser } = useStore();
  
    useEffect(() => {
      const fetchOwnedAnimals = async () => {
        if (!user) return;
  
        try {
          const response = await fetch(`/api/get-owned-animals?npub=${user.npub}`);
          if (!response.ok) {
            throw new Error('Failed to fetch owned animals');
          }
  
          const data = await response.json();
          console.log('Fetched owned animals:', data.ownedAnimals);
          setOwnedAnimals(data.ownedAnimals);
        } catch (error) {
          console.error('Error fetching owned animals:', error);
        }
      };
  
      fetchOwnedAnimals();
    }, [user]);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + animals.length) % animals.length);
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animals.length);
    };
  
    const getAnimalIndex = (offset: number) => {
      return (currentIndex + offset + animals.length) % animals.length;
    };
  
    const renderAnimal = (offset: number) => {
      const index = getAnimalIndex(offset);
      const animal = animals[index];
      const isOwned = ownedAnimals.includes(animal.name);
  
      return (
        <motion.div
          key={animal.name}
          className={`h-48 w-48 flex-shrink-0 mx-1 ${offset === 0 ? 'h-72 w-72 mx-2' : ''}`}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            opacity: offset === 0 ? 1 : 0.5,
            scale: offset === 0 ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {!isOwned && (
              <IconLock size={32} className="absolute top-0 right-0 m-2 text-gray-500" />
            )}
            <img src={animal.image} alt={animal.name} className="h-full w-full object-cover rounded-full" />
          </div>
        </motion.div>
      );
    };
  
    const handleBuy = async () => {
      if (!user) {
        alert("Please log in to buy an animal.");
        return;
      }
  
      const animal = animals[currentIndex].name;
  
      try {
        const response = await fetch('/api/buy-animal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            npub: user.npub,
            animal: animal,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to buy animal');
        }
  
        const result = await response.json();
        console.log('Animal bought successfully:', result);
        alert(`You have successfully bought a ${animal}!`);
        setOwnedAnimals((prev) => [...prev, animal]);
      } catch (error) {
        console.error('Error buying animal:', error);
        alert('Failed to buy animal. Please try again.');
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-orange-100 w-full h-screen">
        <button className="self-start mb-4 bg-gray-300 p-2 rounded-lg">Back</button>
        <div className="relative flex items-center justify-center mb-4 w-full ">
          <div className="flex items-center justify-center overflow-hidden">
            {renderAnimal(-2)}
            {renderAnimal(-1)}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 bg-gray-200 rounded-full z-10 mx-2"
            >
              <IconArrowLeft size={24} />
            </motion.button>
            {renderAnimal(0)}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 bg-gray-200 rounded-full z-10 mx-2"
            >
              <IconArrowRight size={24} />
            </motion.button>
            {renderAnimal(1)}
            {renderAnimal(2)}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={animals[currentIndex].name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center mb-2">{animals[currentIndex].name}</h2>
            <p className="text-center text-lg mb-2">${animals[currentIndex].cost.toLocaleString()}</p>
            <div className="flex items-center justify-center mb-2">
              <img src={animals[currentIndex].specialAbilityImage} alt={animals[currentIndex].specialAbility} className="h-8 w-8 mr-2" />
              <span>{animals[currentIndex].specialAbility}</span>
            </div>
            {Object.entries(animals[currentIndex].stats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between mb-2">
                <span className="capitalize">{stat}</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-4">
                  <motion.div
                    className={`bg-${statColor(stat)} h-4 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              {ownedAnimals.includes(animals[currentIndex].name) ? (
                <div className="bg-gray-300 p-2 rounded-lg">Owned</div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuy}
                  className="bg-yellow-500 p-2 rounded-lg"
                >
                  Buy
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };
  
  const statColor = (stat: string) => {
    switch (stat) {
      case 'speed': return 'green-500';
      case 'health': return 'red-500';
      case 'jump': return 'blue-500';
      case 'strength': return 'yellow-500';
      default: return 'gray-500';
    }
  };
  
  export default ShopDashboard;