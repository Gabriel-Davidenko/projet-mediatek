/**
 * Affiche dans une partie du formulaire si certains champs sont incomplet
 * @param {array} errorMessageList 
 */
export function displayErrorMesssageList(errorMessageList) {
    const message = '<p>Veuillez remplir les champs : ' + errorMessageList.join(' , ') + '<p>';
    const errorMessageHTML = document.getElementById('errorMessage')
    errorMessageHTML.innerHTML = message

}