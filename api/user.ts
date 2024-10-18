import { User, ResourceType } from '@/types';

async function getUser(userId: string): Promise<User> {
    const user: User = {
        userId: userId,
        alias: 'johndoe',
        picture: 'https://example',
        lastActive: new Date(),
        lastTrack: {
            type: ResourceType.Track,
            uri: 'spotify:track:3KkXRkHbMCARz0aVfEt68P'
        }
    }
    return user;
}