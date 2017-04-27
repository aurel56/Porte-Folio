<html>
	<head>
		<title>Quelques photos</title>
		<SCRIPT type="text/javascript" src="JS/Carroussel_rotation.js"></script>
		<SCRIPT type="text/javascript">
			
			var Caroussel;
			function GenererCarrousel(){
				
				var Car_Image_Sources=new Array(
					"img/01.jpg",
					"img/02.jpg",
					"img/03.jpg",
					"img/04.jpg",
					"img/05.jpg",
					"img/06.jpg"
				);
				Caroussel=new Carroussel_Rotation(document.getElementById('Carousel_Menu'),Car_Image_Sources);
				Caroussel.RedimentionnerCalque(0); //Ajuste le calque à la taille maximal  de l'image la plus grande
				Caroussel.Definir_Vitesse(100); //Vitesse de rotation des photos (par défault 50ms)
				Caroussel.Vitesse_Changement_Images(2); //Vitesse de modifications de la taille des photos (par défault 5pixels)
				// Caroussel.Definir_Vitesse_Fondu(0.01); //Vitesse du fondu
			}
		</script>

	</head>
	<body onload="javascript:GenererCarrousel();">
		<center>
		<h1>Carroussel en rotation</h1>
		
		<div id="Carousel_Menu" style="position:relative; width: 80%; padding-bottom: 10px;">&nbsp;</div>
		</center>
	</body>
</html>

