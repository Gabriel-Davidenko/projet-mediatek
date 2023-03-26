import { Media } from "./media.model.js";

export class Movie extends Media{
    constructor({ director, actors, duration, plot, ...media }) {
        super(media);
        this.director = director;
        this.actors = actors;
        this.duration = duration;
        this.plot = plot;
    }
}
