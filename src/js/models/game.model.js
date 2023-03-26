import { Media } from "./media.model.js";

export class Game extends Media {
    constructor({  studio, nbPlayers, plot, ...media }) {
        super(media);
        this.studio = studio;
        this.nbPlayers = nbPlayers;
        this.plot = plot;
    }
}
