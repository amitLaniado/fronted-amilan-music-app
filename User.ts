import { Playlist } from "./interfaces";
import { fetchPlaylists } from "./api";

export class User {
    private userId: number;
    private userName: string;
    private email: string;
    private playlists: Playlist[];

    public constructor (userId: number, userName: string, email: string) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.playlists = [];
    }

    // public updateUser (anotherUser: {user_id: number, user_name: string, email: string}) {
    //     this.userId = anotherUser.user_id;
    //     this.userName = anotherUser.user_name;
    //     this.email = anotherUser.email;
    // }

    public async updateUser (user_id: number) {
        this.userId = user_id;
        this.playlists = await fetchPlaylists();
    }

    public getPlaylists (): Playlist[] {
        return this.playlists;
    }

    public getUserId(): number {
        return this.userId;
    }
    // public getUserName(): string {
    //     return this.userName;
    // }
    // public getEmail(): string {
    //     return this.email;
    // }
}

export const user: User = new User(-1, '', '');