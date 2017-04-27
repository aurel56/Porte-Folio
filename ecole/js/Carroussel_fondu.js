var Carroussel_Fondu= function(Calque,tab){

		var DivPrincipale=Calque;
		var Taille_Image=DivPrincipale.offsetWidth;

		var C_Pre_Img=new Array();
		var tst=new Array();
		var TabImages=new Array();
		TabImages=tab;
		var Diminution=0.1;
		var Vitesse=3000;
		var En_Cours=0;
		var Cible=0;
		var Source=0;
		var LastDiminution;
		var Opacite;
		
		var Ajout_Modif=0;
		var Demande_Modif=0;
		var Charge_Image=0;
		
		this.Definir_Vitesse=function(Vit){
			Vitesse=Vit;
		};
		var Definir_Taille=function(Vit){
			Taille_Image=Vit;
		};
		this.Definir_Vitesse_Fondu=function(Vit){
			Diminution=Vit;
		};
			
		var RedimensionnerImage=function (Img,largeur){
			Img.style.height=parseInt((largeur/(Img.width))*Img.height) +"px";	
			Img.style.width=largeur +"px";	
		};
		
		var ChargerImage=function(){
			
			var res=true;
			DivPrincipale.innerHTML="<center>Loading...</center>";
			for(i=0;i<TabImages.length;i++){
				if(!tst[i].complete){
					res=false;
				}			
			}
			if(res){	
				Charge_Image=1;
				if(Demande_Modif==1){
					Redim(Ajout_Modif);
				}
				
				DivPrincipale.innerHTML="";
				CommencerTounerCarousel();				
			}else{
				
				setTimeout(function(){ChargerImage();},100);
			}
		}
	/*--------------------------------------------------------------------
					LANCE LE CARROUSSEL
	--------------------------------------------------------------------*/			
		this.Carousel=function(){
			for(i=0;i<TabImages.length;i++){
				
				tst[i]=new Image();
				tst[i].src=TabImages[i];
			}
			ChargerImage();
		};	

	/*--------------------------------------------------------------------
				DEMARRE LE CARROUSEL UNE FOIS LES IMAGES CHARGEES
	--------------------------------------------------------------------*/
		var CommencerTounerCarousel=function(){		
				for(i=0;i<TabImages.length;i++){
					RedimensionnerImage(tst[i],Taille_Image);
					C_Pre_Img[i]=document.createElement('div');
					C_Pre_Img[i].appendChild(tst[i]);
					
					C_Pre_Img[i].style.position="absolute";
					C_Pre_Img[i].style.visibility="hidden";
					C_Pre_Img[i].style.display="none";
					changeOpac(C_Pre_Img[i],"0");
					C_Pre_Img[i].style.top="0px";
					C_Pre_Img[i].style.left="0px";
					DivPrincipale.appendChild(C_Pre_Img[i]);
				}
				changeOpac(C_Pre_Img[0],"1");
				C_Pre_Img[0].style.visibility="visible";
				C_Pre_Img[0].style.display="";	

				setTimeout(function(){Tourner_Carroussel();},Vitesse);
		};
	/*--------------------------------------------------------------------
			FAIT TOURNER LE CARROUSSEL
	--------------------------------------------------------------------*/		
		var Tourner_Carroussel=function(){
				Source=En_Cours;
				En_Cours++;
				if (En_Cours>=C_Pre_Img.length){
					En_Cours=0;
				}
				Cible=En_Cours;
				//alert(Source+"//"+Cible);
				changeOpac(C_Pre_Img[Source],1);
				
				C_Pre_Img[Cible].style.visibility="visible";
				C_Pre_Img[Cible].style.display="";
				changeOpac(C_Pre_Img[Cible],0);
				LastDiminution=1;
				Opacite=0;
				setTimeout(function(){Dissoudre_Image();},100);
				
		};
		
	/*--------------------------------------------------------------------
			DISSOUT UNE IMAGE
	--------------------------------------------------------------------*/				
		var Dissoudre_Image=function(){
				
				if(Opacite>=1 && LastDiminution==0){
					
					C_Pre_Img[Source].style.visibility="hidden";
					C_Pre_Img[Source].style.display="none";
					setTimeout(function(){Tourner_Carroussel();},Vitesse);
				}else{
					
					//Diminution 
					if(LastDiminution==0){
						opa=(1-Opacite);
						if(opa<0){
							opa=0;
						}
						
						changeOpac(C_Pre_Img[Source],(opa));
						LastDiminution=1;
					}else{
						
						Opacite=Opacite+Diminution;
						//alert("Cible->"+Opacite);
						changeOpac(C_Pre_Img[Cible],Opacite);
						LastDiminution=0;
					}
					//augmentation
					setTimeout(function(){Dissoudre_Image();},100);
				}
		};
	/*--------------------------------------------------------------------
			CHANGE L'OPACITE D'UN OBJET (BIDOUILLE) COMPATIBLE
	--------------------------------------------------------------------*/		
		var changeOpac=function (obj,opacity) {
				obj.opacity = opacity;
				obj.MozOpacity = opacity;
				obj.KhtmlOpacity = opacity;
				obj.filter = "alpha(opacity=" + opacity*100 + ")";
				obj.style.filter = "alpha(opacity=" + opacity*100 + ")";
				obj.style.opacity = opacity;
				
		}
	/*--------------------------------------------------------------------
					REDIMENSIONNE LE CALQUE
	--------------------------------------------------------------------*/		
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
				val=parseInt(( Taille_Image/tst[i].width)*tst[i].height);
				if(val>max){max=val;}
			}
			if(max!=0){
				DivPrincipale.style.height=(max+ajout)+"px";
			}
		};
	
		
	this.Carousel();

}