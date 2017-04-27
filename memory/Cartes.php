<?php

namespace Cartes\Carte {

	class Carte {
		const hauteur = 131;
		const largeur = 98;
		private $position = - 1;
		private $visible = False;
		private $photo = "";
		private $dos = "";
		private $bloquee = False;
		function __construct($vis, $pic, $position, $dos) {
			$this->position = $position;
			$this->visible = $vis;
			$this->photo = $pic;
			$this->dos = $dos;
			// echo "constructeur de Carte ", __NAMESPACE__,"<br/>";
		}
		function isVisible() {
			return $this->visible;
		}
		function isBloquee() {
			return $this->bloquee;
		}
		function getPhoto() {
			return $this->photo;
		}
		function getPosition() {
			return $this->position;
		}
		function retourner() {
			$this->visible = ! $this->visible;
		}
		function bloquer() {
			$this->bloquee = True;
		}
		function __toString() {
			// return $this->photo . "(" . $this->visible . ")";

			// OnClick="window.location.href='tapage'"
			if ($this->visible) {
				$src = "src=\"$this->photo\"";
			} else {
				$src = "src=\"" . $this->dos . "\"";
			}
			$rep = "<img  width=" . Carte::largeur . " height=" . Carte::hauteur . " " . $src . " alt=\"image\" value=\"$this->position\" />";
			return $rep;
		}
	}
}

namespace Cartes\Paquet {

	class Paquet {
		const racine = "../memory/images";
		const dos = Paquet::racine . "/dos.JPG";
		// static $dos = Paquet::$racine."\\dos.JPG";
		static $initFait = False;
		private $largeur = 10;
		private $hauteur = 8;
		private $grille = array ();
		function __construct($l, $h) {
			$nbCartes = $l * $h;
			$listeImages = Paquet::lirePhotos ();
			if ($nbCartes % 2 == 0) {
				$this->largeur = $l;
				$this->hauteur = $h;
				// Pour mélanger le tableau, on ne lui donne qu'une seule dimension...
				for($i = 0; $i < $nbCartes; $i ++) {
					$this->grille [] = Paquet::genereCarte ( $i, $listeImages );
				}
				shuffle ( $this->grille );
			} else {
				echo "<br/> ERREUR GRILLE, nombre impair de cases <br/>";
			}
		}
		function cartesRetournees() {
			$rep = array ();
			foreach ( $this->grille as $i => $carte ) {
				if ($carte->isVisible () && ! $carte->isBloquee ()) {
					$rep [] = $carte;
				}
			}
			return $rep;
		}
		function gagne() {
			$rep = true;
			foreach ( $this->grille as $i => $carte ) {
				if (! $carte->isVisible () || ! $carte->isBloquee ()) {
					$rep = False;
				}
			}
			return $rep;
		}
		function bloquerEventuellementCartes($image, $cartes) {
			if ($cartes [0]->getPhoto () == $cartes [1]->getPhoto ()) {
				$cartes [0]->bloquer ();
				$cartes [1]->bloquer ();
			}
		}
		function retournerEventuellementCartes($cartes) {
			foreach ( $cartes as $i => $carte ) {
				if (! $carte->isBloquee ()) {
					$carte->retourner ();
				}
			}
		}
		function retournerCarte($position) {
			$cartesRetournees = $this->cartesRetournees ();
			$nbCartesJouees = count ( $cartesRetournees );
			foreach ( $this->grille as $i => $carte ) {
				if ($carte->getPosition () == $position) {
					if (! $carte->isBloquee ()) {
						if ($nbCartesJouees == 1) {
							if ($carte != $cartesRetournees [0]) {
								$carte->retourner ();
								$image = $carte->getPhoto ();
								$cartesRetournees [] = $carte;
								$this->bloquerEventuellementCartes ( $image, $cartesRetournees );
							}
						} else {
							if ($nbCartesJouees == 2) {
								$this->retournerEventuellementCartes ( $cartesRetournees );
							}
							$carte->retourner ();
						}
					}
				}
			}
		}
		function getPhoto() {
			return $this->photo;
		}
		private static function lirePhotos() {
			$liste = array ();
			if ($dossier = opendir ( Paquet::racine )) {
				//echo "Répertoire existant";
				while ( false !== ($fichier = readdir ( $dossier )) ) {
					if ($fichier != "dos.JPG") {
						$lg = strlen ( $fichier );
						$extension = substr ( $fichier, $lg - 4 );
						if ($extension == ".JPG" || $extension == ".jpg" || $extension == ".png" || $extension == ".PNG") {
							
							//echo "ajout $fichier <br/>";
							$liste [] = $fichier;
						}
					}
				}
				closedir ( $dossier );
			}
			return $liste;
		}
		private static function genereCarte($indiceImage, $listeImages) {
			// les cartes vont par paire
			$visible = false;
			$position = $indiceImage;
			if ($indiceImage % 2 == 1) {
				$indiceImage --;
			}
			// $numero = $indiceImage % Paquet::$nbCartes;
			// $image = Paquet::racine . "memo".$numero.".JPG";
			$numero = $indiceImage % (count ( $listeImages ));
			$image = Paquet::racine . "\\" . $listeImages [$numero];
			$carte = new \Cartes\Carte\Carte ( $visible, $image, $position, \Cartes\Paquet\Paquet::dos );
			return $carte;
		}
		function __toString() {
			$rep = "<form method='post' action='index.php'>\n";
			$nbCartes = $this->largeur * $this->hauteur;
			for($i = 0; $i < $nbCartes; $i ++) {
				$carte = $this->grille [$i];
				$rep .= "<button type=\"submit\" name=\"image\" value=\"" . $carte->getPosition () . "\">";
				$rep .= "$carte ";
				$rep .= "</button>\n";
				if ($i % $this->largeur == ($this->largeur - 1)) {
					$rep .= "\n<br/>\n";
				}
			}
			return $rep . "</form>";
		}
	}
}

?>
