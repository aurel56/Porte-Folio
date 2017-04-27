<html>
	<head>
		<title></title>
		<SCRIPT type="text/javascript" src="JS/Carroussel_fondu.js"></script>
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
				Caroussel=new Carroussel_Fondu(document.getElementById('Carousel_Menu'),Car_Image_Sources);
				Caroussel.RedimentionnerCalque(0); //Ajuste le calque à la taille maximal  de l'image la plus grande
				Caroussel.Definir_Vitesse(10); //Vitesse de changement des photos
				Caroussel.Definir_Vitesse_Fondu(0.000001); //Vitesse du fondu
			}
		</script>

	</head>
	<body onload="javascript:GenererCarrousel();">
		<center>
		<h1>Carroussel en fondu</h1>
		
		<div id="Carousel_Menu" style="position:relative; width: 50%; padding-bottom: 10px;">&nbsp;</div>
		</center>
	</body>
</html>