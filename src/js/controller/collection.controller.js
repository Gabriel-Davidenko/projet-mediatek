import { showMedia } from "../vue/display-media.vue.js";
import { Album } from "../models/album.model.js";
import { Game } from "../models/game.model.js";
import { Movie } from "../models/movie.model.js";
import { displayErrorMesssageList } from "../vue/display-error-message.js";
import { Media } from "../models/media.model.js";

/**
 * récupère les inputs du formulaire et ajoute un media à la collection
 * @param {Collection} collection 
 */
export function addMedia(collection) {
  const media = {
    title: document.getElementById("title").value,
    releaseDate: new Date(document.getElementById("releaseDate").value),
    rating: document.getElementById("rating").value,
    img: document.getElementById("img").value,
  };
  let mediaType = document.getElementById("selectMediaList").value;
  //verifie si l'objet media possède toutes les valeurs nécéssaires
  let errorMessageList = validateForm(media, []);
  //ajouter les valeurs du dom
  switch (mediaType) {
    case "game":
      const game = new Game({
        ...media,
        nbPlayers: document.getElementById("nbPlayers").value,
        studio: document.getElementById("studio").value,
        plot: document.getElementById("gamePlot").value,
      });
      errorMessageList = validateForm(game, errorMessageList);
      if (errorMessageList.length == 0) {
        collection.addMedia(game);
        showMedia(game).then(() => {
          document
            .getElementsByName("removeMedia")
            .item(collection.getNbMedias()-1)
            .addEventListener("click", (event) => {
              removeMedia(
                event.target.parentNode.parentNode.parentNode,
                collection,
                game
              );
            });
            sortBy(collection)
        });
      } else {
        displayErrorMesssageList(errorMessageList);
      }
      break;
    case "movie":
      const actorsNode = document.getElementById("actorsList");
      const actors = [];
      actorsNode.childNodes.forEach((node) => {
        actors.push(node.textContent);
      });
      const movie = new Movie({
        actors: actors,
        director: document.getElementById("director").value,
        duration: document.getElementById("duration").value,
        plot: document.getElementById("moviePlot").value,
        ...media,
      });
      errorMessageList = validateForm(movie, errorMessageList);
      if (errorMessageList.length == 0) {
        collection.addMedia(movie);
        showMedia(movie).then(() => {
            document
              .getElementsByName("removeMedia")
              .item(collection.getNbMedias()-1)
              .addEventListener("click", (event) => {
                removeMedia(
                  event.target.parentNode.parentNode.parentNode,
                  collection,
                  movie
                );
              });
              sortBy(collection)
          });
      } else {
        displayErrorMesssageList(errorMessageList);
      }
      break;
    case "album":
      const album = new Album({
        artists: document.getElementById("artist").value,
        nbTracks: document.getElementById("tracks").value,
        ...media,
      });
      errorMessageList = validateForm(album, errorMessageList);
      if (errorMessageList.length == 0) {
        collection.addMedia(album);
        showMedia(album).then(() => {
            document
              .getElementsByName("removeMedia")
              .item(collection.getNbMedias()-1)
              .addEventListener("click", (event) => {
                removeMedia(
                  event.target.parentNode.parentNode.parentNode,
                  collection,
                  album
                );
              });
              sortBy(collection)
          });
      } else {
        displayErrorMesssageList(errorMessageList);
      }

      break;
    default:
      break;
  }
}

/**
 * Vérifie si les champs sont bien remplis, sinon renvoie une liste de message d'erreur
 * @param {Album, Game, Movie} media 
 * @param {array} errorMessageList 
 * @returns {array} liste de message d'erreur 
 */
export function validateForm(media,errorMessageList) {
  switch (true) {
    case media instanceof Album:
      if (!media.artists) {
        errorMessageList.push("artist");
      }
      if (!media.nbTracks) {
        errorMessageList.push("nbtracks");
      }
      break;
    case media instanceof Movie:
      if (!media.actors) {
        errorMessageList.push("actors");
      }
      if (!media.director) {
        errorMessageList.push("director");
      }
      if (!media.duration) {
        errorMessageList.push("duration");
      }
      if (!media.plot) {
        errorMessageList.push("plot");
      }
      break;
    case media instanceof Game:
      if (!media.nbPlayers) {
        errorMessageList.push("nbPlayers");
      }
      if (!media.studio) {
        errorMessageList.push("studio");
      }
      if (!media.plot) {
        errorMessageList.push("plot");
      }
      break;
    case media instanceof Media:
      if (!media.title) {
        errorMessageList.push("title");
      }
      if (!media.releaseDate) {
        errorMessageList.push("releaseDate");
      }
      if (!media.rating) {
        errorMessageList.push("rating");
      }
      if (!media.img) {
        errorMessageList.push("img");
      }
    default:
      break;
  }
  return errorMessageList;
}

/**
 * Retire un media de la liste et l'affichage
 * @param {Node} htmlNode 
 * @param {Collection} collection 
 * @param {Album, Movie, Game} media 
 */
export function removeMedia(htmlNode, collection, media) {
  document.getElementById("card-list").removeChild(htmlNode);
  collection.removeMedia(media);
}

/**
 * trie la collection en fonction de l'option choissit
 * @param {Collection} collection 
 */
export function sortBy(collection){
  const sortBy = document.getElementById("sortBy").value;
  switch (sortBy) {
    case 'releaseDate':
      collection.medias = collection.medias.sort((mediaA, mediaB)=>{return mediaA.releaseDate - mediaB.releaseDate})
      break;
    case 'rating':
      collection.medias = collection.medias.sort((mediaA, mediaB)=>{return mediaB.rating - mediaA.rating})
      break;
    case 'title':
      collection.medias = collection.medias.sort((mediaA, mediaB)=>{
        const ta = mediaA.title.toLowerCase();
        const tb = mediaB.title.toLowerCase();
    if (ta < tb) {
        return -1;
    }
    if (ta > tb) {
        return 1;
    }
    return 0;})
      break;
    default:
      break;
  }
  document.getElementById("card-list").innerHTML = ''
  collection.medias.forEach((media)=>{showMedia(media)})
}