import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
  deleteObject,
  // 프로필 삭제 api 검색해서 따로 import해서  추가했더니 화면이 하얗게 보임
  // 있는 import에 이렇게 'getStorage, deleteObject'만 추가 하니 오류 안남
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("profileBtn").disabled = true;


  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ?? null,
  });

    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "#fanLog";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
};

  // 프로필 삭제
export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("deleteBtn").disabled = true;

  const storage = getStorage();
  const desertRef = ref(storage, "downloadUrl");
  
  await deleteObject(desertRef, {
    displayName: newNickname ?? null,
    photoURL: downloadUrl ?? null,
  })

  .then(() => {
    alert("프로필 삭제 완료");
    window.location.hash = "#fanLog";
  })
  .catch((error) => {
    alert("프로필 삭제 실패");
    console.log("error:", error);
  });
};
// 이렇게 하니까 changeProfile이 두 번 선언돼서 창이 또 하얗게 뜸




export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};
