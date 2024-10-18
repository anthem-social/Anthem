
export type Resource = {
    type: ResourceType;
    uri: string;
}

export enum ResourceType {
    Track = 'track',
    Album = 'album',
    Artist = 'artist',
    Playlist = 'playlist',
    User = 'user',
    Episode = 'episode',
    Show = 'show',
    Unknown = 'unknown'
}