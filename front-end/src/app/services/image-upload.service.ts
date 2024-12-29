import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor() { }

  uploadImage(file: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);  // Store the image under 'images' folder

    return uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .catch(error => {
        console.error("Error uploading image: ", error);
        throw new Error("Upload failed");
      });
  }
}
