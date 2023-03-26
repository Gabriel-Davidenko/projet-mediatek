import { displayActor } from "../vue/add-media.vue.js";

/**
 * Ajoute un listener pour supprimer l'acteur
 */
export function addActor() {
    displayActor(document.getElementById("movieActors").value)
    document.getElementById("movieActors").value = ""
}