import React, { useState, useEffect, useRef } from "react";
import { useFoodStore, FoodItem } from "./DataStore/FoodStore";

interface Props {
  closeForm: () => void;
  foodToEdit?: FoodItem | null;
}

const CrudForm: React.FC<Props> = ({ closeForm, foodToEdit }) => {
  const { create, update } = useFoodStore();
  const [food, setFood] = useState(foodToEdit?.food || "");
  const [price, setPrice] = useState(foodToEdit?.price.toString() || "");
  const [taste, setTaste] = useState(foodToEdit?.taste || "평범");
  const [review, setReview] = useState(foodToEdit?.review || "");
  const foodInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (foodToEdit) {
      setFood(foodToEdit.food);
      setPrice(foodToEdit.price.toString());
      setTaste(foodToEdit.taste);
      setReview(foodToEdit.review);
    }
    foodInputRef.current?.focus();
  }, [foodToEdit]);

  const handleSubmit = () => {
    const newItem = {
      id: foodToEdit ? foodToEdit.id : Date.now().toString(),
      food,
      price,
      taste,
      review,
    };
    foodToEdit ? update(newItem) : create(newItem);
    closeForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {foodToEdit ? "음식 수정" : "음식 추가"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block font-medium">음식명</label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="border p-2 w-full"
              placeholder="음식명을 입력하세요"
              ref={foodInputRef}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">가격</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 w-full"
              placeholder="가격을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">맛</label>
            <select
              value={taste}
              onChange={(e) => setTaste(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="노맛">노맛</option>
              <option value="평범">평범</option>
              <option value="매우 맛있음">매우 맛있음</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">리뷰</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border p-2 w-full"
              placeholder="리뷰를 입력하세요"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-300 text-black py-2 px-4 rounded"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {foodToEdit ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
