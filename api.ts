import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { connectedUser } from './data';

// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "https://backend-amilan-music-app.onrender.com";

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
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
  }
}


// export const createPlaylist = async (playlistName: string) => {
//   try {
//     const rawBody: {}
//   }
// }

// export const addSongToPlaylist = async (songName: string) => {

// }

export const fetchPlaylists = async () => {
  try {
    // const params = { user_id: connectedUser.user_id };
    // const response = await axios.get(
    //   `${baseUrl}/playlists`, 
    //   { params }
    // );
    const response = await axios.get(
      `${baseUrl}/playlists/user/${connectedUser.user_id}`
    );
    console.log("songs: ", response);
    return response.data.playlists;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}

export const fetchPlaylistSongs = async (playlistId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/playlists/${playlistId}`);
    return response.data.songs;
  } catch (error) {
    console.error("error: ", error);
    return [];
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