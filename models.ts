export class User {
    private userId: number;
    private userName: string;
    private email: string;

    public constructor (userId: number, userName: string, email: string) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
    }

    public updateUser (anotherUser: {user_id: number, user_name: string, email: string}) {
        this.userId = anotherUser.user_id;
        this.userName = anotherUser.user_name;
        this.email = anotherUser.email;
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