									
									
									function heat(heatmap,map,agencia){
												
											//agencia="LOS ANGELES";			
										downloadUrl("./mapas/pda.php?agencia=" + agencia,function(data) {
										
										var xml = data.responseXML;
										var coordenadas = xml.documentElement.getElementsByTagName("coordenadas");
											
											  var posicion = new google.maps.LatLng(
															  parseFloat(coordenadas[0].getAttribute("lat")),
															  parseFloat(coordenadas[0].getAttribute("lon")));
											

											
										
										var markers = xml.documentElement.getElementsByTagName("marker");
											
											if(markers.length>1){
											
														 var pointArray = new google.maps.MVCArray();
														
														for (var i = 0; i < markers.length; i++) {
																
															  var point = new google.maps.LatLng(
															  parseFloat(markers[i].getAttribute("lat")),
															  parseFloat(markers[i].getAttribute("lng")));
															  
															   pointArray.push(point);
														
														}
													
															heatmap.setData(pointArray);
													   
														var styles = [{
															stylers: [{ gamma: 0.52 },
															{invert_lightness: true},
															{Weight : 0.1}
															]},
														];
											  
														map.setOptions({styles: styles});
														map.setCenter(posicion);
														map.setZoom(11);
														
														
														heatmap.setMap(map);
														
															
									}else{

										 cajaMensajes("error", "No existen registros para la selección", 5000);
									}		
									
								});
						
						
						}

					
					
					
				
					
				
					
				




						function leeXml(map,customIcons){
						
										downloadUrl("./mapas/PruebaXmlTBC.php", function(data) {
										
										var xml = data.responseXML;
										var markers = xml.documentElement.getElementsByTagName("marker");
										
										//CREO ARREGLO QUE GUARDA PUNTOS EN 2 GRUPOS SEGUN SEA EL CASO
										no_disp = new Array();
										disp = new Array();
										
										//alert(markers.length);
										
										for (var i = 0; i < markers.length; i++) {
												
											var  infoBubble = new InfoBubble({
										//maxHeight:440
											
											});


										  var agencia = markers[i].getAttribute("agencia");
										  var ns = markers[i].getAttribute("ns");
										  var type = markers[i].getAttribute("type");
										
										  var point = new google.maps.LatLng(
											  parseFloat(markers[i].getAttribute("lat")),
											  parseFloat(markers[i].getAttribute("lng")));
											  
											/* ************ OTRAS VARIABLES ****************************       */  
											 
											 var totalMoviles=50;
											 var horarioSalida='08:13';
									
										
									
										
										
										infoBubble.addTab('Probable Ácido', ns_prob_acd(agencia,ns));
										
										
										
										infoBubble.addTab('Reparto Flota',rep_flota(totalMoviles,horarioSalida));
										
										
										
										infoBubble.addTab('Eficiencia Flota', efi_rep());
										
										
										 
										  var icon = customIcons[type] || {};
										  var marker = new google.maps.Marker({
											map: map,
											position: point,
											icon: icon.icon,
											shadow: icon.shadow
														
										  });
									
									
									//INTRODUCE SOLO LOS PUNTOS NO DISPONIBLES AL ARRAY	
										if(type==1 || type==2){
											no_disp.push(marker);	
										
										}else{
											disp.push(marker);	
										
										}
										
										
										bindInfoWindow(marker, map, infoBubble);
										
										}
												
								
								
								});
						
							}
						
						
				
						
						
						
						
						
						
						
						  function downloadUrl(url, callback) {
			
								var request = false;
								 //new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
								  
								  if(window.XMLHttpRequest) { 
									request = new XMLHttpRequest(); 
									}else if(window.ActiveXObject) { 
									request = new ActiveXObject("Microsoft.XMLHTTP"); 
									}else{ 
									alert('Su navegador no soporta Ajax'); 
									} 
								  
								  

							  request.onreadystatechange = function() {
								if (request.readyState == 4) {
								  request.onreadystatechange = doNothing;
								  callback(request, request.status);
								}
							  };

							  request.open('GET', url, true);
							  request.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT");
							  request.send();
					  
							}
						
						
						
						
									 function contenido_pestanas_acd(agencia,ns){
											
										var html;
									
											//alert(id_pestana +'-'+agencia+'-'+ns);
											
										/*var  html = '<table border=1>';
										  html = html + '<tr>';
										  html = html + '<td>';
										  */
										  
										  html = '<font face=arial size=13><b>' + agencia + '</b></font>';
										  /*
										  html ='<table>';
										  html = html + '<tr><td><font face=arial size=3><b><i>' + agencia + '</i></b></font></td></tr>';
										  html = html + '<tr><td>NS Actual : <b>' + ns +' %</b></td></tr>';
										  html = html + '</table>';
										*/
										
												
										  html= html +'<table class="Tabla_info">';
										  html=html +'<tr><td>Estados</td><td>Qty</td></tr>';
										  html=html +'<tr><td>PD día Anterior</td><td>' + ns +'</td></tr>';
										  html=html +'<tr><td>EX día Anterior</td><td>' + ns +'</td></tr>';
										  html=html +'<tr><td>OF. Dom. Serv. Quebrado</td><td>' + ns +'</td></tr>';
										  html=html +'<tr><td>OF. Agencia + 30 días</td><td>' + ns +'</td></tr>';
										  html=html +'<tr><td>OF rendidas sin cerrar</td><td>' + ns +'</td></tr>';
										  html=html +'</tr>';
										  html= html +'</table>';
										  
										 // html = html + '<br>';
										  
										 html = html + '<table border=1>';
										 html = html + '<tr><td><font size=1>Ult. Actualización: <br><font size=1 color=red><i>05-08-2013 13:16</i></font></td></tr></table>';
										
										return html
									
									}	
									
									
									function contenido_pestanas_flota(totalMoviles,horarioSalida){
										
										//alert(id_pestana +'-'+agencia+'-'+ns);
											
										/*var  html = '<table border=1>';
										  html = html + '<tr>';
										  html = html + '<td>';
										  */
											var html='<div id=cuadros>';							
										  
										  html=html + '<div id=clientes style="margin: auto;float:left">';
										  html=html + '<table class="Tabla_info">';
										  html=html +'<tr><td>OF en RE</td><td>Qty</td></tr>';
										  html=html +'<tr><td>Falabella</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Ripley</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Fedex</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Wallmart</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Sodimac</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Easy</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Otros Clientes</td><td>' + totalMoviles +'</td></tr>';
										  html= html +'</table>';
										  html=html + '</div>';
										  html=html + '</div>';
										 
										  html= html + '<div id=sit_mov style="margin: auto;float:left;">';
										  html= html +'<table class="Tabla_info">';
										  html=html +'<tr><td colspan=2>Situación Móviles</td></tr>';
										  html=html +'<tr><td>Cant. Moviles en RE</td><td>' + totalMoviles +'</td></tr>';
										  html=html +'<tr><td>Hora Salida 1º Movil</td><td>' + horarioSalida +'</td></tr>';
										  html= html +'</table>';
										  html=html + '</div>';



										 
										 html = html + '<table>';
										 html = html + '<tr><td><font size=1>Ult. Actualización: <br><font size=1 color=red><i>05-08-2013 13:16</i></font></td></tr></table>';


									
										return html;
								}
								
								
								function contenido_pestanas_efi(){
										
										  //var html ='<br>';																		  
										  
										  var html = '<table class="Tabla_info">';
										  html=html +'<tr><td>Cliente</td><td>Ent</td><td>Dev</td><td>Re</td><td>%Ácid</td><td>%Just</td></tr>';
										  html=html +'<tr><td>Falabella</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Ripley</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Fedex</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Wallmart</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Sodimac</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Easy</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html=html +'<tr><td>Otros Clientes</td><td>90</td><td>10</td><td>50</td><td>90%</td><td>92%</td></tr>';
										  html= html +'</table>';
										  
										  
										 html = html + '<table>';
										 html = html + '<tr><td><font size=1>Ult. Actualización: <br><font size=1 color=red><i>05-08-2013 13:16</i></font></td></tr></table>';


									
										return html;
								}
								