import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

async function fetchImages(user = '640bf6e47781518ed5c23575') {
  try {
    const response = await apiClient.get(`/images/?id=${user}`);
    return response.data
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function uploadImage(file){
  const formData = new FormData()
  formData.append('photo',file)
  formData.append('userId','640bf6e47781518ed5c23575')

  try {
    const response = await apiClient.post('/images', formData)

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

  async function deleteImage(idString) {
    try {
      const response = await apiClient.delete(`/images/${idString}`);
      fetchImages()
      console.log('File Deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
}

async function updateImageName(id, name) {
  console.log(name)
  try {
    await apiClient.patch(`/images/${id}`, { updateName: `${name}` });
  } catch (error) {
    console.error('Error updating image name:', error);
  }
}



async function fetchPlayers(user = '640bf6e47781518ed5c23575') {
  try {
    const response = await apiClient.get(`/images/?id=${user}`);
    return response.data
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}


export {apiClient, fetchImages, uploadImage, deleteImage, updateImageName}