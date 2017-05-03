<?php
include "ihm/declaration_ihm.php";
include "ihm/header_ihm.php";
include "ihm/menu/menu_ihm.php"; ?>
<br>



<!--  début du bloc commentaires, version 1.0  (06 novembre 2009)-->
<script language="JavaScript" type="text/javascript">
    var sujet='general'; // les dix premiers caractères serviront d'identification de la liste des commentaires
    var adressebase='';  // base d'adressage pour le fichier PHP de gestion des commentaires
</script>
<div id="laisseruncommentaire">
    <form name="commentaire_bouton" id="commentaire_form_A" action="" method="" onsubmit="return false;" style="display: Block">
        <input type="button" value="laisser un commentaire" onclick="Affiche_form_B()">
    </form>
    <form name="commentaire_saisie" id="commentaire_form_B" action="" method="" onsubmit="return false;" style="display: Block">
		<fieldset>
        <legend>Vous pouvez saisir un commentaire ...</legend>
			Votre nom (<i><small>ou pseudo</small></i>):<br><input name="nom" type="text" size="20"><br>
			Saisissez le commentaire que vous voulez ajouter:<BR>
			<textarea name="commentaire" cols="60" rows="4" wrap="soft"></textarea>
			<input name="annuler" type="button" value="Annuler" onclick="Annuler()"><br>
			<input name="envoyermodifier" type="button" value="Envoyer" onclick="Envoyer_modifier()">&nbsp;&nbsp;
			<input name="terminer" type="button" value="Terminer" onclick="Terminer()" style="display: None">
        </fieldset>
    </form>
    <div id="liste_des_messages">&nbsp;</div>
</div>
<script language="JavaScript" type="text/javascript" src="commentaires.js"></script>
<!-- fin du bloc commentaires -->

<?php
include "ihm/script_ihm.php";
include "ihm/footerIHM.php"
?>