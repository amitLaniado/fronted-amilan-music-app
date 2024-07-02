// export let connectedUser: {user_id: number, user_name: string, email: string}; // maybe do class instead.
export let connectedUser: {user_id: number, user_name: string, email: string} = {user_id: 15, user_name: "laniado", email: "laniado123@gmail.com"}; // maybe do class instead.

export const connectUser = (user: {user_id: number, user_name: string, email: string}) => {
    connectedUser = user;
}