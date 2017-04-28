<!DOCTYPE html>
<html>
<title>W3.CSS</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/lib/w3.css">
<style>
.mySlides {display:none}
</style>
<body>

<div class="w3-container">
  <h2>Dossier E6</h2>
</div>

<div class="w3-content" style="max-width:800px">
<?php    
$compteur = 0;
if ($dossier = opendir ( "pdf/competance/" )) {
//echo "Répertoire existant";
	while ( false !== ($fichier = readdir ( $dossier )) ) {
	$lg = strlen ( $fichier );
	$extension = substr ( $fichier, $lg - 4 );
            if ($extension == ".jpg" || $extension == ".JPG" ||$extension == ".pdf" || $extension == ".PDF" ) {
//echo "ajout $fichier <br/>";
	echo '<ifram class="mySlides" src="pdf/competance/'.$fichier.'" style="width:50%" height=75%>';
        $compteur++;
		}
	}

	closedir ( $dossier );
			}

    
    ?>
  <!--<img class="mySlides" src="img/CP/claudine_ps_ateliers.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_02.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_03.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_04.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_05.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_06.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_ateliers_07.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_avant_recre.jpg" style="width:60%">
  <img class="mySlides" src="img/CP/claudine_ps_avant_recre_02.jpg" style="width:60%">-->
</div>

<div class="w3-center">
  <div class="w3-section">
    <button class="w3-button" onclick="plusDivs(-1)"><</button>
    <button class="w3-button" onclick="plusDivs(1)">></button>
  </div>
    <?php 
    if ($compteur != 0){
      for ($index = 1; $index <= $compteur; $index++) {
          echo '<button class="w3-button demo" onclick="currentDiv('.$index.')">'.$index.'</button> ';
      }
    }
    ?>
  <!--<button class="w3-button demo" onclick="currentDiv(1)">1</button> 
  <button class="w3-button demo" onclick="currentDiv(2)">2</button> 
  <button class="w3-button demo" onclick="currentDiv(3)">3</button> 
  <button class="w3-button demo" onclick="currentDiv(4)">4</button> 
  <button class="w3-button demo" onclick="currentDiv(5)">5</button> 
  <button class="w3-button demo" onclick="currentDiv(6)">6</button>
  <button class="w3-button demo" onclick="currentDiv(7)">7</button> 
  <button class="w3-button demo" onclick="currentDiv(8)">8</button> 
  <button class="w3-button demo" onclick="currentDiv(9)">9</button> -->
  
  
  
  
</div>
    

<script>
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-red";
}
</script>

</body>
</html>


