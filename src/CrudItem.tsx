import React, { useState, useEffect, useRef } from "react";

interface CrudItemProps {
  food: {
    id: string;
    food: string;
    price: string;
    taste: string;
    review: string;
  };
  onUpdate: (
    id: string,
    updatedFood: { food: string; price: string; taste: string; review: string }
  ) => void;
  onDelete: (id: string) => void;
  isAdding?: boolean;
  foodInputRef?: React.RefObject<HTMLInputElement>;
}

const CrudItem: React.FC<CrudItemProps> = ({
  food,
  onUpdate,
  onDelete,
  isAdding,
  foodInputRef,
}) => {
  const [isEditing, setIsEditing] = useState(isAdding || false);
  const [updatedFood, setUpdatedFood] = useState(food);

  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const tasteInputRef = useRef<HTMLSelectElement | null>(null);
  const reviewInputRef = useRef<HTMLTextAreaElement | null>(null);

  // 수정 모드로 전환될 때 음식명 입력란에 자동으로 포커스를 맞추기
  useEffect(() => {
    if (isEditing && foodInputRef?.current) {
      foodInputRef.current.focus(); // 음식 추가 창에서 음식명에 포커스를 맞춤
    }
  }, [isEditing, foodInputRef]);

  const handleSave = () => {
    onUpdate(food.id, updatedFood);
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    nextRef: React.RefObject<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > | null
  ) => {
    if (e.key === "Enter" || e.key === "Tab") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus(); // 엔터나 탭이 눌리면 다음 필드로 포커스 이동
        e.preventDefault(); // 기본 동작 방지 (폼 제출 방지 등)
      }
    }
  };

  return (
    <div className="border p-5 border-gray-200 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedFood.food}
            onChange={(e) =>
              setUpdatedFood({ ...updatedFood, food: e.target.value })
            }
            className="border p-3 rounded-lg mb-3 w-full"
            ref={foodInputRef} // 포커스를 맞출 ref
            onKeyDown={(e) => handleKeyDown(e, priceInputRef)} // 엔터나 탭 시 가격 입력란으로 포커스 이동
          />
          <input
            type="text"
            value={updatedFood.price}
            onChange={(e) =>
              setUpdatedFood({ ...updatedFood, price: e.target.value })
            }
            className="border p-3 rounded-lg mb-3 w-full"
            ref={priceInputRef}
            onKeyDown={(e) => handleKeyDown(e, tasteInputRef)} // 엔터나 탭 시 맛 선택란으로 포커스 이동
          />
          <select
            value={updatedFood.taste}
            onChange={(e) =>
              setUpdatedFood({ ...updatedFood, taste: e.target.value })
            }
            className="border p-3 rounded-lg mb-3 w-full"
            ref={tasteInputRef}
            onKeyDown={(e) => handleKeyDown(e, reviewInputRef)} // 엔터나 탭 시 리뷰 입력란으로 포커스 이동
          >
            <option value="평범">평범</option>
            <option value="매우 맛있음">매우 맛있음</option>
            <option value="노맛">노맛</option>
          </select>
          <textarea
            value={updatedFood.review}
            onChange={(e) =>
              setUpdatedFood({ ...updatedFood, review: e.target.value })
            }
            className="border p-3 rounded-lg mb-3 w-full"
            ref={reviewInputRef}
            onKeyDown={(e) => handleKeyDown(e, null)} // 리뷰 후 엔터나 탭 시 아무 동작도 하지 않음
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            저장
          </button>
        </>
      ) : (
        <>
          <h3 className="font-bold">{food.food}</h3>
          <p>가격: {food.price}원</p>
          <p>맛: {food.taste}</p>
          <p>리뷰: {food.review}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="bg-red-500 text-white py-1 px-3 rounded-lg ml-2 hover:bg-red-600"
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
};

export default CrudItem;
