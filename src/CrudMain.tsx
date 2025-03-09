import React, { useEffect, useState, useRef } from "react";
import {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
} from "./FIrebase/firebaseService";
import CrudItem from "./CrudItem";

const CrudMain: React.FC = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [newFood, setNewFood] = useState({
    food: "",
    price: "",
    taste: "평범",
    review: "",
  });
  const foodInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadFoods = async () => setFoods(await getFoods());
    loadFoods();
  }, []);

  const handleAddFood = async () => {
    if (newFood.food && newFood.price) {
      await addFood(newFood);
      setFoods(await getFoods());
      setNewFood({ food: "", price: "", taste: "평범", review: "" });
      foodInputRef.current?.focus();
    }
  };

  const handleUpdateFood = async (
    id: string,
    updatedFood: { food: string; price: string; taste: string; review: string }
  ) => {
    await updateFood(id, updatedFood);
    setFoods(await getFoods());
  };

  const handleDeleteFood = async (id: string) => {
    await deleteFood(id);
    setFoods(await getFoods());
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<any> | null
  ) => {
    if (["Enter", "Tab"].includes(e.key) && nextRef?.current) {
      nextRef.current.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">음식 리스트</h2>
      <ul className="space-y-6">
        {foods.map((food) => (
          <li key={food.id}>
            <CrudItem
              food={food}
              onUpdate={handleUpdateFood}
              onDelete={handleDeleteFood}
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">음식 추가</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="음식명"
            value={newFood.food}
            onChange={(e) => setNewFood({ ...newFood, food: e.target.value })}
            className="border p-3 rounded-lg w-full"
            ref={foodInputRef}
            onKeyDown={(e) => handleKeyDown(e, null)}
          />
          <input
            type="text"
            placeholder="가격"
            value={newFood.price}
            onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
            className="border p-3 rounded-lg w-full"
            onKeyDown={(e) => handleKeyDown(e, null)}
          />
          <select
            value={newFood.taste}
            onChange={(e) => setNewFood({ ...newFood, taste: e.target.value })}
            className="border p-3 rounded-lg w-full"
          >
            <option value="평범">평범</option>
            <option value="매우 맛있음">매우 맛있음</option>
            <option value="노맛">노맛</option>
          </select>
          <textarea
            value={newFood.review}
            onChange={(e) => setNewFood({ ...newFood, review: e.target.value })}
            className="border p-3 rounded-lg w-full sm:col-span-2"
          />
        </div>
        <button
          onClick={handleAddFood}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-6 hover:bg-blue-600"
        >
          음식 추가
        </button>
      </div>
    </div>
  );
};

export default CrudMain;
