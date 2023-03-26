import { Media } from "./media.model.js";

export class Album extends Media{
    constructor({  artists, nbTracks, ...media }) {
        super(media);
        this.artists = artists;
        this.nbTracks = nbTracks;
    }
}