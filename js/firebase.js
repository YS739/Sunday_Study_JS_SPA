// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDgZFryJqe7yM0mecxon-rzlurSM7N7dqE",
  authDomain: "loginprac2-1f9d9.firebaseapp.com",
  projectId: "loginprac2-1f9d9",
  storageBucket: "loginprac2-1f9d9.appspot.com",
  messagingSenderId: "526268757308",
  appId: "1:526268757308:web:a9d8a3ee9fa0fe5adc5a39",
  measurementId: "G-6ML0ZLER2F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
