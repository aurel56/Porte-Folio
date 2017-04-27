<?php namespace Principal;
include ("Cartes.php"); // Inclure les classes d'objets avant de démarrer la session
session_start ();
?>
<html>
<meta charset="UTF-8">
<head>
<link rel="stylesheet" media="screen" type="text/css"
	href="./memory.css" />
<title>jeu de carte</title>
</head>

<body>
	<p style="color: blue; font-family: Arial; font-size: 20">
	<?php
	use Cartes\Paquet\Paquet as Paq;
	function nouvellePartie() {
		$paquet = new Paq ( 8, 5 );
		$_SESSION ['paquet'] = $paquet;
		echo $paquet;
	}
	
	if (! isset ( $_SESSION ['paquet'] )) {
		nouvellePartie ();
	} else if (isset ( $_POST ["rejouer"] )) {
		session_destroy ();
		echo "Nouvelle Partie !!";
	} else {
		// if (isset ( $_POST ["image"] )) {
		$position = $_POST ["image"];
		$paquet = $_SESSION ['paquet'];
		$paquet->retournerCarte ( $position );
		if ($paquet->gagne ()) {
			echo "GAGNE !!";
		}
		// }
		echo $paquet;
	}
	// use Cartes\Carte\Carte as Carte;
	
	// $carte=new Carte(True, Paq::dos, 12, Paq::dos);
	// echo "<br/><br/>$carte<br/><br/>";
	
	?>
	
	
	
	
	
	<form action="index.php" id="formulaireSortie" method="POST">

		<input type="submit" name="rejouer" value="Nouvelle Partie" />
	</form>

	</p>


</body>
</html>


