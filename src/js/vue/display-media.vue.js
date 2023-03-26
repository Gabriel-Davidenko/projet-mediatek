import { Album } from "../models/album.model.js";
import { Game } from "../models/game.model.js";
import { Movie } from "../models/movie.model.js";

/**
 * Affiche le média passé en paramètre
 * @param {album, movie, game } media 
 * @returns {promise}
 */
export function showMedia(media) {
  return new Promise((resolve, reject) => {
    const type = { type: "" };
    switch (true) {
      case media instanceof Movie:
        type.type = "movie";
 
        break;
      case media instanceof Game:
        type.type = "game";
 
        break;
      case media instanceof Album:
        type.type = "album";
 
        break;
    }
  let toPrint = `<div class="card">`;
  toPrint += `<img class="card-img-top" src="${media.img}" alt="background ${media.title}">`;
  toPrint += `<div class="card-body">`;
    toPrint += `<h3 class="card-title mb-0"><img src="./assets/images-site/${type.type}.png" alt="${type.type} icon" class="me-2 image-titre-size">${media.title}</h3>`;
    toPrint +=
      '<p class="text-muted">Released the ' +
      String(media.releaseDate.getDate()).padStart(2, "0") +
      "/" +
      String(media.releaseDate.getMonth() + 1).padStart(2, "0") +
      "/" +
      media.releaseDate.getFullYear() +
      ", " +
      String(media.releaseDate.getHours()).padStart(2, "0") +
      ":" +
      String(media.releaseDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(media.releaseDate.getSeconds()).padStart(2, "0") +
      "</p>";

    switch (type.type) {
      case "album":
      toPrint += `<p class="card-text">By <b>${media.artists}</b> containts ${media.nbTracks} tracks</p>`;
      break;
      case "movie":
      toPrint += `<p class="card-text">Directed by ${media.director}, with `;
      for (let i = 0; i < 10; i++) {
          if (i < media.actors.length) {
            if (i == 0) {
              toPrint += media.actors[i];
            } else if (i == media.actors.length - 1) {
              toPrint += " and " + media.actors[i];
            } else {
              toPrint += ", " + media.actors[i];
            }
        }
      }
      toPrint += `, a ${media.duration} minutes film. ${media.plot}</p>`;
      break;
      case "game":
      toPrint += `<p class="card-text">Made by <b>${media.studio}</b> for ${media.nbPlayers} player(s). ${media.plot}</p>`;
      break;
  }

  toPrint += `</div>`;
  toPrint += `<div class="containter">`;
  toPrint += `<p class="row w-100 m-0 ps-3 border-top">Rating :`;
  for (let i = 0; i < 5; i++) {
      if (i < media.rating) {
        toPrint += " ★";
      } else {
        toPrint += " ☆";
      }
  }
  toPrint += `</p>`;
  toPrint += `<div class="row w-100 m-0">`;
  toPrint += `<button type="button" class="col border-0 fw-bold text-black-50 rounded-bottom-start"><img src="./assets/images-site/edit.png" alt="edit icon" class="me-2 image-button-size">Edit</button>`;
    toPrint += `<button type="button" data-title="${media.title}" data-releaseDate="${media.releaseDate}" name="removeMedia" class="col border-0 bg-info text-light fw-bold rounded-bottom-end"><img src="./assets/images-site/remove.png" alt="remove icon" class="me-2 image-button-size">Remove</button>`;
  toPrint += `</div>`;
  toPrint += `</div>`;
  toPrint += `</div>`;

    document.getElementById("card-list").innerHTML += toPrint;
    resolve(true);
    reject((error) => {
      console.log(error);
    });
  });
}
