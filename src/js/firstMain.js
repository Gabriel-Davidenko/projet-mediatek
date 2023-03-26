import {
  addMedia,
  removeMedia,
  sortBy,
} from "./controller/collection.controller.js";
import { Album } from "./models/album.model.js";
import { Collection } from "./models/collection.model.js";
import { Game } from "./models/game.model.js";
import { Movie } from "./models/movie.model.js";
import { populateSelect, displayMediaSpecifics } from "./vue/add-media.vue.js";
import { showMedia } from "./vue/display-media.vue.js";

/**
 * Ajoute des données de test
 * @returns {array} : données de test
 */
function addTestMedias() {
  const album1 = new Album({
    artists: "47ter",
    nbTracks: "1",
    title: "Cote West",
    releaseDate: new Date("05/31/2001"),
    rating: "4",
    img: "https://cdn.discordapp.com/attachments/1029306641553817661/1047585393442291805/unknown.png",
  });
  const album2 = new Album({
    artists: "Orelsan",
    nbTracks: "25",
    title: "Civilisation Edition Ultime",
    releaseDate: new Date("11/19/2021"),
    rating: "5",
    img: "https://cdn.discordapp.com/attachments/707971319874060348/1047606430619942952/image.png",
  });
  const game1 = new Game({
    title: "Animal Crossing",
    releaseDate: new Date("06/17/2004"),
    rating: "3",
    img: "https://cdn.discordapp.com/attachments/1029306641553817661/1047586527347220550/unknown.png",
    nbPlayers: "1",
    studio: "Nintendo EAD",
    plot: "Animal Crossing: New Horizons is a 2020 social simulation game developed and published by Nintendo for the Nintendo Switch; it is the fifth main entry in the Animal Crossing series.",
  });
  const game2 = new Game({
    title: "Far Cry 4",
    releaseDate: new Date("11/18/2014"),
    rating: "4",
    img: "https://cdn.discordapp.com/attachments/707971319874060348/1047607599304028200/image.png",
    nbPlayers: "1",
    studio: "Ubisoft",
    plot: "Far Cry 4 is an open-world first-person shooter video game published by Ubisoft. It was released for PlayStation 3, PlayStation 4, Xbox 360, Xbox One and Windows on November 18, 2014 in North America and Europe. The game won Best First Person Shooter at The Game Awards 2014.",
  });
  const movie1 = new Movie({
    actors: ["Emma Stone", "Ryan Gosling"],
    director: "Damien Chazelle",
    duration: "122",
    plot: "La La Land is a 2016 American romantic musical comedy-drama film written and directed by Damien Chazelle. It stars Ryan Gosling and Emma Stone as a struggling jazz pianist and an aspiring actress, respectively, who meet and fall in love while pursuing their dreams in Los Angeles. John Legend, Rosemarie DeWitt, Finn Wittrock, and J. K. Simmons appear in supporting roles.",
    title: "LaLaLand",
    releaseDate: new Date("07/01/2022"),
    rating: "5",
    img: "https://cdn.discordapp.com/attachments/1029306641553817661/1047587269063753859/unknown.png",
  });

  return [album2, movie1, game1, album1, game2];
  // .forEach(function(media){
  // showMedia(media);
  // allMedias.push(media);
  // });
  // localStorage.setItem('savedMedias',JSON.stringify(allMedias));
}

function filterBy(media, collection) {
  console.log("we will filter by " + media);
  document.getElementById("card-list").innerHTML = "";
  switch (media) {
    case "all":
      collection.medias.forEach((media, index) =>
        showMedia(media).then(() => {
          document
            .getElementsByName("removeMedia")
            .item(index)
            .addEventListener("click", (event) => {
              removeMedia(
                event.target.parentNode.parentNode.parentNode,
                collection,
                media
              );
            });
        })
      );
      break;
    case "album":
      const albumCollection = collection.filter((media, index) => {
        return media instanceof Album;
      });
      albumCollection.forEach((media, index) => {
        showMedia(media).then(() => {
          document
            .getElementsByName("removeMedia")
            .item(index)
            .addEventListener("click", (event) => {
              removeMedia(
                event.target.parentNode.parentNode.parentNode,
                collection,
                media
              );
            });
        });
      });
      break;
    case "game":
      const gameCollection = collection.filter((media, index) => {
        return media instanceof Game;
      });
      gameCollection.forEach((media, index) => {
        showMedia(media).then(() => {
          document
            .getElementsByName("removeMedia")
            .item(index)
            .addEventListener("click", (event) => {
              removeMedia(
                event.target.parentNode.parentNode.parentNode,
                collection,
                media
              );
            });
        });
      });
      break;
    case "movie":
      const movieCollection = collection.filter((media, index) => {
        return media instanceof Movie;
      });
      movieCollection.forEach((media, index) => {
        showMedia(media).then(() => {
          document
            .getElementsByName("removeMedia")
            .item(index)
            .addEventListener("click", (event) => {
              removeMedia(
                event.target.parentNode.parentNode.parentNode,
                collection,
                media
              );
            });
        });
      });
      break;
  }
}
//----------------------MAIN------------------
document.addEventListener("DOMContentLoaded", () => {
  populateSelect();

  let mainCollection = new Collection();
  const precedentMedias = JSON.parse(localStorage.getItem("savedMedias"));
  if (precedentMedias && precedentMedias.length > 0) {
    precedentMedias.forEach((media, index) => {
      switch (true) {
        case media.artists != undefined:
          media = new Album({ ...media });
          break;
        case media.studio != undefined:
          media = new Game({ ...media });
          break;
        case media.director != undefined:
          media = new Movie({ ...media });
          break;
      }
      media.releaseDate = new Date(media.releaseDate);
      showMedia(media).then(() => {
        document
          .getElementsByName("removeMedia")
          .item(index)
          .addEventListener("click", (event) => {
            removeMedia(
              event.target.parentNode.parentNode.parentNode,
              mainCollection,
              media
            );
          });
      });
      mainCollection.addMedia(media);
    });
  } else {
    addTestMedias().forEach((media, index) => {
      showMedia(media).then(() => {
        document
          .getElementsByName("removeMedia")
          .item(index)
          .addEventListener("click", (event) => {
            removeMedia(
              event.target.parentNode.parentNode.parentNode,
              mainCollection,
              media
            );
          });
      });
      mainCollection.addMedia(media);
    });
  }

  //-----------------------Listener------------------------
  document
    .getElementById("filterByAll")
    .addEventListener("click", () => filterBy("all", mainCollection));
  document
    .getElementById("filterByAlbum")
    .addEventListener("click", () => filterBy("album", mainCollection));
  document
    .getElementById("filterByGame")
    .addEventListener("click", () => filterBy("game", mainCollection));
  document
    .getElementById("filterByMovie")
    .addEventListener("click", () => filterBy("movie", mainCollection));
  document
    .getElementById("addTestMedias")
    .addEventListener("click", () => addTestMedias());

  //listener sur le bouton du formulaire pour ajouter un media
  document.getElementById("saveMedia").addEventListener("click", () => {
    addMedia(mainCollection);
  });

  //listener pour modifier la valeur du formulaire d'ajout en fonction du type de media
  document.getElementById("selectMediaList").onchange = (event) => {
    displayMediaSpecifics(event.target.value);
  };

  //listener pour trier la collection en fonction du paramètre choissit dans le select
  document.getElementById("sortBy").onchange = () => {
    sortBy(mainCollection);
  };
});
