import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = "http://10.0.2.2:8000";
// const baseUrl = "http://10.0.0.15:8000";

export const fetchSongOptions = async (songName: string) => {
    try {
        console.log("search song options for: ", songName);

        const response = await axios.get(`${baseUrl}/song/songOptions/${songName}`);
        return response.data;
    } catch (error) {
        console.error("error: ", error);
    }
}

export const downloadMP3 = async (songUrl: string, fileName: string): Promise<string | null> => {
    const path = `${FileSystem.documentDirectory}${fileName}`;
    console.log("path in downloadMP3: ", path);

    try {
      const { uri } = await FileSystem.downloadAsync(`${baseUrl}/song/download/?song_url=${songUrl}`, path);
      console.log('File successfully downloaded:', uri);
      return uri;
    } catch (error) {
      console.error('Download error:', error);
      return null;
    }
}

export const login = async (userName: string, password: string) => {
  try {
    const rawBody: { user_name: string, password: string} = { user_name: userName, password: password };
    const response = await axios.post(
      `${baseUrl}/users/login`, 
      rawBody,
      // { headers: { "Content-Type": "application/json" } } // Set Content-Type header
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const register = async (userName: string, email: string, password: string) => {
  try {
    const rawBody: { user_name: string, email: string, password: string} = { user_name: userName, email: email, password: password };
    const response = await axios.post(
      `${baseUrl}/users/register`, 
      rawBody,
      // { headers: { "Content-Type": "application/json" } } // Set Content-Type header
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

// export const testNetwork = async () => {
//   console.log("test network");
//   const youtube_search_url = "https://www.googleapis.com/youtube/v3/search"
    
//   const youtube_params = {
//       "part": "snippet",
//       "q": "sha-boom",
//       "type": "video",
//       "maxResults": 10,
//       "key": "AIzaSyAGSeY-PSmVhutAdGMb9tKOWN6-HR-OTUU"
//   }
  
//   try {
//     const response = await axios.get(youtube_search_url, {
//       params: youtube_params
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }

// }