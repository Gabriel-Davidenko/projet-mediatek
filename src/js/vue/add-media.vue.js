import { addActor } from "../controller/media.controller.js";

/**
 * Insère les option dans le select
 */
export function populateSelect() {
    const mediaTypeList = ["album", "game", "movie"];
    const selectMediaList = document.getElementById("selectMediaList");
    mediaTypeList.forEach((media) => {
      const option = document.createElement("option");
      option.value = media;
      option.innerHTML = media;
      selectMediaList.appendChild(option);
    });
  }
  
/**
 * Affiche la partie de formulaire correspondant au type de média choisit
 * @param {string} mediaType 
 */
export function displayMediaSpecifics(mediaType) {
    let specificsForm = "";
    switch (mediaType) {
      case "album":
        //pas inner html, mais document et append child
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="artist">Artist:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="artist" placeholder="Enter artist or band name">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="tracks">Tracks:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="number" class="form-control" id="tracks" placeholder="Enter total nulber of tracks">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        document.getElementById('saveMedia').disabled = false;

        break;
      case "game":
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="studio">Studio:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="studio" placeholder="Enter studio name">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="nbPlayers">Number of players:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="number" class="form-control" id="nbPlayers" placeholder="Enter total nulber of players">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="gamePlot">Plot:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="gamePlot" placeholder="Enter plot">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        document.getElementById('saveMedia').disabled = false;

        break;
      case "movie":
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="director">Director:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="director" placeholder="Enter director name">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="duration">Duration:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="number" class="form-control" id="duration" placeholder="Enter duration (in minutes)">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="moviePlot">Plot:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="moviePlot" placeholder="Enter plot">';
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += '<div class="form-group">';
        specificsForm +=
          '<label class="control-label " for="movieActors">Add actor:</label>';
        specificsForm += "<div>";
        specificsForm +=
          '<input type="text" class="form-control" id="movieActors" placeholder="Actor name">';
        specificsForm += "<div>";
        specificsForm += "<button type=\"button\" class=\"btn btn-primary\" id='addActor'>Ajouter</button>"
        specificsForm += "</div>";
        specificsForm += "<div>";
        specificsForm += "<h5>Actors list : </h5>";
        specificsForm += "<ul class=\"list-group\" id='actorsList'>";
        specificsForm += "</ul>";
        specificsForm += "</div>";
        specificsForm += "</div>";
        specificsForm += "</div>";
        document.getElementById('saveMedia').disabled = false;

        //pour les acteurs, ajouter une input et un bouton, quand on ajoute un utilisateur, on met son nom dans une liste 
        //liste constitué de span avec un event listener pour supprimer un acteur on clic 
        break;
        default:
          document.getElementById('saveMedia').disabled = true;
          break;
    }
    document.getElementById("specification").innerHTML = specificsForm;
    document.getElementById("errorMessage").innerHTML = ''
    //add event listener for actors button if type = movie
    if (mediaType === 'movie') {
        document.getElementById('addActor').addEventListener('click', ()=>{addActor()})
    }
  }
  
  /**
   * Affiche un acteur dans l'affichage
   * @param {string} actor 
   */
export function displayActor(actor) {
    const liNewActor = document.createElement('li');
    liNewActor.textContent = actor;
    document.getElementById('actorsList').appendChild(liNewActor)
    liNewActor.addEventListener('click', () => { liNewActor.parentNode.removeChild(liNewActor) }, false)
}