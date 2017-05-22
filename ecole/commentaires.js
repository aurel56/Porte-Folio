/* Fichier JavaScript: "commentaires.js"
+------------------------------------------------------------------------------+
| Extension pour une fonction "ajout de commentaires"                          |
| Tedheu 2009, version 1.0 (fr),        mise � jour le 09 novembre 2009        |
| Module script JavaScript externe                                             |
| fonctionne de paire avec le module PHP "gestioncommentaires.php"             |
+------------------------------------------------------------------------------+
*/
//------------------ variables
if (typeof sujet == "undefined") sujet='aucun';
// Adresse du module PHP de traitement et du fichiers des messages
if (typeof adressebase == "undefined") adressebase='';
//
//------------------ tirage d'un nombre al�atoire 'jeton'
var jeton= Math.floor(Math.random()*2521008887);
//
//------------------ objets pour g�rer l'affichage du formulaire
var Obj_listemes= getObj('liste_des_messages');
var Obj_formulaireA= getObj('commentaire_form_A');
var Obj_formulaireB= getObj('commentaire_form_B');
//
//------------------ cr�ation d'un objet XHR_commentaires (interface 'AJAX')
var XHR_commentaires;  
if (window.XMLHttpRequest){
    XHR_commentaires= new XMLHttpRequest(); // Firefox
}else if (window.ActiveXObject){    
    XHR_commentaires= new ActiveXObject('Microsoft.XMLHTTP'); // Internet Explorer
}else{
    // ce type d'objet n'est pas support� par le navigateur
    alert('Votre navigateur ne supporte pas les objets XMLHTTPRequest ...');
}
//------------------ actions imm�diates
Gestioncommentaires(sujet,0);
//
/*========= fonctions JavaScript =============================================*/
//--- gestion de la saisie de commentaire
function Gestioncommentaires(sujet,action){
    switch (action){
        case 0:
            ressource = adressebase+'gestioncommentaires.php?sujet='+sujet+'&action=lecture&jeton='+jeton;
            XHR_commentaires.open('GET',ressource,true);
            datapost= null;
            break;
        case 1:
            ressource = adressebase+'gestioncommentaires.php?sujet='+sujet+'&action=ecriture&jeton='+jeton;
            XHR_commentaires.open('POST',ressource,true);
            var champ_nom = Obj_formulaireB.nom.value;
            var champ_com = Obj_formulaireB.commentaire.value;
            datapost = '&nom='+escape(champ_nom);
            datapost += '&message='+escape(champ_com);
            datapost= datapost.replace(/\+/g,'%2B');
            XHR_commentaires.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            XHR_commentaires.setRequestHeader("Content-length", datapost.length);
            XHR_commentaires.setRequestHeader("Connection", "close");
            break;
    }
    XHR_commentaires.onreadystatechange = function(){ // attribution de la fonction
        if (XHR_commentaires.readyState == 4){
            Obj_listemes.innerHTML = XHR_commentaires.responseText;
        }else{
            Obj_listemes.innerHTML = 'chargement en cours ...';
        }
    }
    XHR_commentaires.send(datapost);
}
//---
function Affiche_form_B(){
    Obj_formulaireA.style.display= 'None';
    Obj_formulaireB.style.display= 'Block';
    Obj_formulaireB.nom.focus()
}
//---
function Envoyer_modifier(){
    incomplet= '0';
    champ_nom= Obj_formulaireB.nom.value;
    champ_com= Obj_formulaireB.commentaire.value;
    if (champ_nom=='') Obj_formulaireB.nom.focus();
    if ((champ_com=='') && (champ_nom!='')) Obj_formulaireB.commentaire.focus();
    if ((champ_com=='') || (champ_nom=='')) incomplet= '1';
    if (incomplet!='1') {
        Obj_formulaireB.envoyermodifier.value= 'Modifier';
        Obj_formulaireB.terminer.style.display= 'Inline';
        Gestioncommentaires(sujet,1);
    }else{
        Gestioncommentaires(sujet,0);
    }
}
//---
function Annuler(){
    Obj_formulaireB.nom.value= '';
    Obj_formulaireB.commentaire.value= '';
    Gestioncommentaires(sujet,1);
    Terminer();
}
//---
function Terminer(){
    Obj_formulaireB.style.display= 'None';
    Obj_formulaireA.style.display= 'Block';
    location.reload();
}
//---
function getObj(Id){
    var Obj;
    if (document.getElementById){
        Obj = document.getElementById(Id);
    }else{
        // sinon, tant pis !
        alert('Votre navigateur ne supporte pas la s�lection d\'objet � partir de son ID ...');
    }
    return Obj;
}
/*========= fin du script ====================================================*/
