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
