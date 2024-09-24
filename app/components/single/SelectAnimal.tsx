import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/app/store/useStore';
import animals from '@/app/components/shop/animals'; // Import the animals array
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'; // Import icons

const SelectAnimal = ({ onSelect }: { onSelect: (animalName: string) => void }) => {
  const [ownedAnimals, setOwnedAnimals] = useState<string[]>([]);
  const { user } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Filter animals based on owned animals
  const filteredAnimals = animals.filter(animal => ownedAnimals.includes(animal.name));

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredAnimals.length) % filteredAnimals.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAnimals.length);
  };

  const renderAnimal = (offset: number) => {
    const index = (currentIndex + offset + filteredAnimals.length) % filteredAnimals.length;
    const animal = filteredAnimals[index];

    if (!animal) return null; // Return null if animal is not found

    return (
      <div className='h-screen justify-center items-center flex'> 
        <motion.div
          key={animal.name}
          className={`h-48 w-48 flex-shrink-0 mx-1 ${offset === 0 ? 'h-72 w-72 mx-2' : ''}`}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            opacity: offset === 0 ? 1 : 0.5,
            scale: offset === 0 ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          onClick={() => onSelect(animal.name)} // Call onSelect when the animal is clicked
        >
          <div className="relative">
            <img src={animal.image} alt={animal.name} className="h-full w-full object-cover rounded-full" />
          </div>
          <p className="text-center text-2xl font-bold mt-2">{animal.name}</p>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-orange-100 w-full h-screen">
      <button className="self-start mb-4 bg-gray-300 p-2 rounded-lg">Back</button>
      <div className="relative flex items-center justify-center mb-4 w-full">
        <div className="flex items-center justify-center overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default SelectAnimal;