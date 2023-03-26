export class Collection{
    constructor() {
        this.medias = Array()
    }


    addMedia(media) {
        this.medias.push(media);
        localStorage.setItem('savedMedias', JSON.stringify(this.medias))

    }

    removeMedia(mediaToRemove) {
        this.medias = this.medias.filter((media)=>{return media.title != mediaToRemove.title && media.releaseDate != mediaToRemove.releaseDate});
        localStorage.setItem('savedMedias', JSON.stringify(this.medias))

    }

    getNbMedias() {
        return this.medias.length;
    }

    filter(filterFn){
        return this.medias.filter(filterFn);
    }
}