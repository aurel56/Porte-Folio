var Carroussel_Rotation= function(Calque,tab){
		var DivPrincipale=Calque;
		var Taille_Totale=parseInt(Calque.offsetWidth);
		var Taille_Max=Taille_Totale/2;
		var ImageOrdre=new Array();
		var TabImages=new Array();
		TabImages=tab;
		var CW_I=new Array();
		var C_Pre_Img=new Array();
		var Debut;
		var Diminution=5;
		var Vitesse=50;
		
		var Ajout_Modif=0;
		var Demande_Modif=0;
		var Charge_Image=0;
		
		this.Definir_Vitesse=function(Vit){
			Vitesse=Vit;
		};
		
		this.Vitesse_Changement_Images=function(Vit){
			Diminution=Vit;
		};
		
		var RedimensionnerImage=function (Numero,largeur){
			CW_I[Numero].style.width=largeur +"px";	
			CW_I[Numero].style.height=parseInt((largeur/(C_Pre_Img[Numero].width))*C_Pre_Img[Numero].height) +"px";	
		}
		
		this.Carousel=function(){
			if(TabImages.length<4){
				//alert("Erreur ! Pas assez d'image");
			}else{

				for(i=0;i<TabImages.length;i++){
					C_Pre_Img[i]=new Image();
					C_Pre_Img[i].src=TabImages[i];						
				}
			}
			AttendreChargementImage();
		};		
			
		var AttendreChargementImage=function(){
			var res=true;
			DivPrincipale.innerHTML="<center>Loading...</center>";
			for(i=0;i<TabImages.length;i++){
				if(!C_Pre_Img[i].complete){
					res=false;
				}			
			}
			if(res){	
				Charge_Image=1;
				if(Demande_Modif==1){
					Redim(Ajout_Modif);
				}
				DivPrincipale.innerHTML="";
				CommencerCarrousel();				
			}else{
				
				setTimeout(function(){AttendreChargementImage();},100);
			}
		};
			
		var CommencerCarrousel=function(){		
					
			if(DivPrincipale.style.borderLeftWidth!=""){
				Debut=parseInt(DivPrincipale.offsetLeft)+parseInt(DivPrincipale.style.borderLeftWidth);
			}else{
				Debut=parseInt(DivPrincipale.offsetLeft);
			}
					
			for(i=0;i<TabImages.length;i++){
			
				CW_I[i]=document.createElement("img");
				CW_I[i].src=C_Pre_Img[i].src;
						
						
				DivPrincipale.appendChild(CW_I[i]);	
				CW_I[i].style.position="absolute";
				CW_I[i].style.visibility="hidden";
				CW_I[i].style.display="none";
				CW_I[i].style.top="0px";
			}
							
			CW_I[0].style.left="0px";	
			RedimensionnerImage(0,Taille_Max/2);
			CW_I[0].style.visibility="visible";
			CW_I[0].style.display="";
				
			CW_I[1].style.left=CW_I[0].style.width;	
			RedimensionnerImage(1,Taille_Max);
			CW_I[1].style.visibility="visible";
			CW_I[1].style.display="";
				
			CW_I[2].style.right=0;	
					
			RedimensionnerImage(2,Taille_Totale-parseInt(CW_I[1].style.width)-parseInt(CW_I[0].style.width));
			CW_I[2].style.visibility="visible";
			CW_I[2].style.display="";
			for(i=0;i<TabImages.length;i++){
				ImageOrdre[i]=i;
			}
					
			Tourner_Carroussel();
				
		};
			
			var Tourner_Carroussel=function(){
				//on diminu l'image de gauche
				if((parseInt(CW_I[ImageOrdre[0]].style.width)-(1.5*Diminution))>10){
					RedimensionnerImage(ImageOrdre[0],parseInt(CW_I[ImageOrdre[0]].style.width)-(1.5*Diminution));
				}else{
					//todo disparition de l'image de gauche
					CW_I[ImageOrdre[0]].style.visible="hidden";
					CW_I[ImageOrdre[0]].style.display="none";
					CW_I[ImageOrdre[1]].style.left="0px";
					var last=ImageOrdre[0];
					for(i=1;i<ImageOrdre.length;i++){
						ImageOrdre[i-1]=ImageOrdre[i];
					}
					ImageOrdre[ImageOrdre.length-1]=last;
				}
				//on diminu l'image suivante et on la décale
				RedimensionnerImage(ImageOrdre[1],parseInt(CW_I[ImageOrdre[1]].style.width)-(0.5*Diminution));
				CW_I[ImageOrdre[1]].style.left=parseInt(CW_I[ImageOrdre[0]].style.left)+parseInt(CW_I[ImageOrdre[0]].style.width)+"px";
				//on augmente la 3em image
				RedimensionnerImage(ImageOrdre[2],parseInt(CW_I[ImageOrdre[2]].style.width)+(1.5*Diminution));
				CW_I[ImageOrdre[2]].style.left=parseInt(CW_I[ImageOrdre[1]].style.left)+parseInt(CW_I[ImageOrdre[1]].style.width)+"px";
				//on augmente la 4em image

				var taille_restante=parseInt(Taille_Totale-(parseInt(CW_I[ImageOrdre[0]].style.width)+parseInt(CW_I[ImageOrdre[1]].style.width)+parseInt(CW_I[ImageOrdre[2]].style.width)));
				if(CW_I[ImageOrdre[3]].style.display=="none"){
					if(taille_restante>10){
						//on la montre
							//taille
							RedimensionnerImage(ImageOrdre[3],taille_restante);
							//position
							CW_I[ImageOrdre[3]].style.left=parseInt(CW_I[ImageOrdre[2]].style.left)+parseInt(CW_I[ImageOrdre[2]].style.width)+"px";							
						CW_I[ImageOrdre[3]].style.display="";
						CW_I[ImageOrdre[3]].style.visibility="visible";
					}
				}else{
					RedimensionnerImage(ImageOrdre[3],taille_restante);
					CW_I[ImageOrdre[3]].style.left=parseInt(CW_I[ImageOrdre[2]].style.left)+parseInt(CW_I[ImageOrdre[2]].style.width)+"px";	
				}
				setTimeout(function(){Tourner_Carroussel();},Vitesse)
				
			};
			
		this.RedimentionnerCalque=function(ajout){
			if(Charge_Image==1){
				Redim(ajout);
			}else{
				Ajout_Modif=ajout;
				Demande_Modif=1;
			}
				
		};
		
		
		var Redim=function(ajout){
			max=0;
			for(i=0;i<TabImages.length;i++){
				val=parseInt((Taille_Max/C_Pre_Img[i].width)*C_Pre_Img[i].height);
				if(val>max){max=val;}
			}
			if(max!=0){
				DivPrincipale.style.height=(max+ajout)+"px";
			}
		}
		
	this.Carousel();

}