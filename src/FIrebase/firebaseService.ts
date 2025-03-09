// firestore-service.ts
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// todos 컬렉션 참조
const todosCollection = collection(db, "todos");

// 새로운 음식 항목 추가
export const addFood = async (newFood: {
  food: string;
  price: string;
  taste: string;
  review: string;
}) => {
  try {
    await addDoc(todosCollection, newFood);
    console.log("음식 추가됨");
  } catch (e) {
    console.error("오류 발생:", e);
  }
};

// 모든 음식 항목 가져오기
export const getFoods = async () => {
  const querySnapshot = await getDocs(todosCollection);
  const foods: any[] = [];
  querySnapshot.forEach((doc) => {
    foods.push({ id: doc.id, ...doc.data() });
  });
  return foods;
};

// 음식 항목 수정
export const updateFood = async (
  id: string,
  updatedFood: { food: string; price: string; taste: string; review: string }
) => {
  const foodDoc = doc(db, "todos", id);
  await updateDoc(foodDoc, updatedFood);
  console.log("음식 수정됨");
};

// 음식 항목 삭제
export const deleteFood = async (id: string) => {
  const foodDoc = doc(db, "todos", id);
  await deleteDoc(foodDoc);
  console.log("음식 삭제됨");
};
