import { Me } from '@/types/Me';
import { getAnthemClient } from './client';

export async function getMe(): Promise<Me> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get('/spotify/me');
        const me = response.data as Me;
        console.log("Me: " + JSON.stringify(me));
        return me;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}