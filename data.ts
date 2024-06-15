let connectedUser; // maybe do class instead.

export const connectUser = (user: {user_name: string, email: string}) => {
    connectedUser = user;
}