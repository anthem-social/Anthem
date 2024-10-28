import { User } from '@/types/User';
import { getAnthemClient } from './client';
import { ResourceType } from '@/types/Resource';

export async function getUser(): Promise<User> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get('/spotify/user');
        const user = response.data as User;
        console.log("User: " + JSON.stringify(user));
        console.log("User Last Active: " + user.lastActive);
        console.log("User Last Track Type: " + user.lastTrack.type.toString());
        var match = user.lastTrack.type == ResourceType.Track;
        console.log("User Last Track Matches?: " + match);
        return user;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}