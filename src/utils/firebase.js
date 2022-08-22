import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBsaLVivHac90DwmXn4vEJDF-7SGmn3z_8",
  authDomain: "mhduongtest2.firebaseapp.com",
  projectId: "mhduongtest2",
  storageBucket: "mhduongtest2.appspot.com",
  messagingSenderId: "437403138778",
  appId: "1:437403138778:web:ce51bd5df0975d405bc3e3",
  measurementId: "G-D0438N1DQE",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);