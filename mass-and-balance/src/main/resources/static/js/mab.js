$(document).ready(function(){
	$('.mab-field').on('input', function(){
		refreshMab($(this))
	});
	$('.fd-field').on('input', function(){
		refreshMab($(this))
	});
	
	$('.fd-field').on('input', function(){
		refreshFuelDevis($(this))
	});
	
	$('.mab-field').not('.fuel-d').each(function(){
		if($(this).val()){
			refreshMab($(this))
		}
	});
		
	$('#fuel_flow_usg').on('input', function(){
		$('#fuel_flow').val( ($('#fuel_flow_usg').val() * 3.78541).toFixed(1) )
		refreshMab($(this))
		refreshFuelDevis($(this))
	})
	
	$('#fuel_flow').on('input', function(){
		$('#fuel_flow_usg').val( ($('#fuel_flow').val() / 3.78541).toFixed(1) )
		refreshMab($(this))
		refreshFuelDevis($(this))
	})
	
	$('#print_btn').click(function(){
		window.print();
	});
	
	$('#pdf_btn').click(function(){
		exportPdf();
	});
});

function refreshFuelDevis(updatedField){
	const updatedTr = updatedField.closest('tr');
	if(updatedField.hasClass('fd-fuel-min')){
		if(updatedField.val()){
			const fuelMin = updatedField.val();
			const fuelL = fuelMin * $('#fuel_flow').val() / 60;
			const fuelUsg = fuelL / 3.78541;
			updatedTr.find('.fd-fuel-l').val(fuelL.toFixed(1));
			updatedTr.find('.fd-fuel-usg').val(fuelUsg.toFixed(1));
		}else{
			updatedTr.find('.fd-fuel-l').val('');
			updatedTr.find('.fd-fuel-usg').val('');
		}
		
	}else if(updatedField.hasClass('fd-fuel-l')){
		if(updatedField.val()){
			const fuelL = updatedField.val();
			const fuelUsg = fuelL / 3.78541;
			const fuelMin = fuelL * 60 / $('#fuel_flow').val();
			updatedTr.find('.fd-fuel-usg').val(fuelUsg.toFixed(1));
			updatedTr.find('.fd-fuel-min').val(fuelMin.toFixed());
		}else{
			updatedTr.find('.fd-fuel-min').val('');
			updatedTr.find('.fd-fuel-usg').val('');
		}
	}else if(updatedField.hasClass('fd-fuel-usg')){
		if(updatedField.val()){
			const fuelUsg = updatedField.val();
			const fuelL = fuelUsg * 3.78541;
			const fuelMin = fuelL * 60 / $('#fuel_flow').val();
			updatedTr.find('.fd-fuel-l').val(fuelL.toFixed(1));
			updatedTr.find('.fd-fuel-min').val(fuelMin.toFixed());
		}else{
			updatedTr.find('.fd-fuel-l').val('');
			updatedTr.find('.fd-fuel-min').val('');
		}
	}else if(updatedField.is('#fuel_flow') || updatedField.is('#fuel_flow_usg')){
		$('.fd-fuel-min').each(function(){
			const tr = $(this).closest('tr');
			if(tr.find('.fd-fuel-l').val()){
				const fuelL = tr.find('.fd-fuel-l').val() * 1.0;
				const fuelMin = fuelL * 60 / $('#fuel_flow').val();
				tr.find('.fd-fuel-min').val(fuelMin.toFixed());	
			}
		})
	}
	
	let totalL = 0;
	let totalUsg = 0;
	let totalMin = 0;
	
	$('#fuel_devis tbody tr').each(function(){
		const tr = $(this);
		if(tr.find('.fd-fuel-min').val()){
			totalMin += tr.find('.fd-fuel-min').val() * 1.0;
		}
		if(tr.find('.fd-fuel-l').val()){
			totalL += tr.find('.fd-fuel-l').val() * 1.0;
		}
		if(tr.find('.fd-fuel-usg').val()){
			totalUsg += tr.find('.fd-fuel-usg').val() * 1.0;
		}
	});
	
	$('#fd_total_l').text(totalL.toFixed()+' l');
	$('#fd_total_usg').text(totalUsg.toFixed(1)+ ' usg');
	$('#fd_total_min').text(totalMin.toFixed()+' min');
	
}

function refreshMab(updatedField){
	const updatedTr = updatedField.closest('tr');
	//Management of fuel
	if(updatedField.hasClass('fuel-kg')){
		const fuelKg = updatedField.val();
		const fuelL = fuelKg / $('#fuel_density').val();
		const fuelUsg = fuelL / 3.78541;
		updatedTr.find('.fuel-l').val(fuelL.toFixed(1));
		updatedTr.find('.fuel-usg').val(fuelUsg.toFixed(1));
	}else if(updatedField.hasClass('fuel-l')){
		const fuelL = updatedField.val();
		const fuelUsg = fuelL / 3.78541;
		const fuelKg = fuelL * $('#fuel_density').val();
		updatedTr.find('.fuel-usg').val(fuelUsg.toFixed(1));
		updatedTr.find('.fuel-kg').val(fuelKg.toFixed(1));
	}else if(updatedField.hasClass('fuel-usg')){
		const fuelUsg = updatedField.val();
		const fuelL = fuelUsg * 3.78541;
		const fuelKg = fuelL * $('#fuel_density').val();
		updatedTr.find('.fuel-l').val(fuelL.toFixed(1));
		updatedTr.find('.fuel-kg').val(fuelKg.toFixed(1));
	}else if(updatedField.hasClass('fuel-d')){
		$('.fuel-l').each(function(){
			const tr = $(this).closest('tr');
			const fuelL = tr.find('.fuel-l').val() * 1.0;
			const fuelKg = fuelL * updatedField.val();
			tr.find('.fuel-kg').val(fuelKg.toFixed(1));
		})
	}
	
	
	let fuelBurnKg = $('#flight_time').val() * $('#fuel_flow').val() * 1.0 / 60.0 * $('#fuel_density').val();
	//calcul des moments
	let momentTotal = 0;
	let totalMass = 0;
	let momentTotalDry = 0;
	let totalMassDry = 0;
	let momentTotalLdg = 0;
	let totalMassLdg = 0;
	let fuelLiters = 0;
	
	
	$('.input-row').each(function(){
		let tr = $(this);
		
		if(tr.find('.mab-weight').val()){
			let mass = tr.find('.mab-weight').val() * 1.0;
			totalMass+= mass;
			let moment = mass * tr.find('.mab-arm').text();
			momentTotal += moment;
			tr.find('.mab-moment').text(moment.toFixed(1))
			
			if(tr.find('.mab-max-weight').text()){
				let masseMax = tr.find('.mab-max-weight').text() * 1.0;
				if(mass > masseMax){
					tr.find('.mab-max-weight').addClass('has-text-weight-bold has-text-danger');
				}else{
					tr.find('.mab-max-weight').removeClass('has-text-weight-bold has-text-danger');
				}
			}
			
			if( ! tr.hasClass('is-fuel')){
				momentTotalDry += moment;
				totalMassDry += mass;
				momentTotalLdg += moment;
				totalMassLdg += mass;
			}else{
				fuelLiters += tr.find('.fuel-l').val() * 1.0;
				let mas = tr.find('.mab-weight').val() * 1.0 - fuelBurnKg;
				let mmt = mas * tr.find('.mab-arm').text();
				momentTotalLdg += mmt;
				totalMassLdg += mas;
			}
		}
	});
	
	let armResult = momentTotal/totalMass;
	let armResultDry = momentTotalDry/totalMassDry;
	let armResultLdg = momentTotalLdg/totalMassLdg;
	
	$('.result-row .mab-moment').text(momentTotal.toFixed(1));
	$('.result-row .mab-weight').text(totalMass.toFixed(1));
	$('.result-row .mab-arm').text(armResult.toFixed(2));
	
	let mtow = $('#mtow').val() * 1.0;
	let mlw = $('#mlw').val() * 1.0;
	let mzfw = $('#mzfw').val() * 1.0;
	let maxFuel = $('#max_fuel').val() * 1.0;
	
	if(totalMass > mtow){
		$('.result-row .mab-weight').addClass("has-text-danger")
	}else{
		$('.result-row .mab-weight').removeClass("has-text-danger")
	}
	
	//CALCULATE LANDING MASS
	let landingMass = totalMass - fuelBurnKg;
	
	let minWeight = 100000000;
	let maxWeight = -100000000;
	let minArm = 1000000;
	let maxArm = -1000000;
	
	$('.mab-line').each(function(){
		if($(this).find('.p1-arm').val()*1.0 < minArm)
			minArm = $(this).find('.p1-arm').val() * 1.0;
			
		if($(this).find('.p2-arm').val()*1.0 < minArm)
			minArm = $(this).find('.p2-arm').val() * 1.0;	
			
		if($(this).find('.p1-arm').val()*1.0 > maxArm)
			maxArm = $(this).find('.p1-arm').val() * 1.0;
			
		if($(this).find('.p2-arm').val()*1.0 > maxArm)
			maxArm = $(this).find('.p2-arm').val() * 1.0;		
			
		if($(this).find('.p1-weight').val()*1.0 < minWeight)
			minWeight = $(this).find('.p1-weight').val() * 1.0;
			
		if($(this).find('.p2-weight').val()*1.0 < minWeight)
			minWeight = $(this).find('.p2-weight').val() * 1.0;	
			
		if($(this).find('.p1-weight').val()*1.0 > maxWeight)
			maxWeight = $(this).find('.p1-weight').val() * 1.0;
			
		if($(this).find('.p2-weight').val()*1.0 > maxWeight)
			maxWeight = $(this).find('.p2-weight').val() * 1.0;			
	});
	
	minArm -= (maxArm - minArm)*0.05
	maxArm += (maxArm - minArm)*0.05  
	
	minWeight -= (maxWeight - minWeight )*0.05
	maxWeight += (maxWeight - minWeight )*0.10  
	
	
	//drawing canvas
	let canvas = document.getElementById('mab_canvas');
	
	let dx = canvas.offsetWidth;
	let dy = canvas.offsetHeight;
	let cx = canvas.offsetWidth / (maxArm - minArm);
	let cy = canvas.offsetHeight / (maxWeight - minWeight);
	
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
	
	if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

		//dessin de l'enveloppe
		ctx.strokeStyle = 'hsl(171, 100%, 41%)'
		ctx.lineWidth = 2
		
		ctx.shadowOffsetX = 0;
	  ctx.shadowOffsetY = 0;
	  ctx.shadowBlur = 1;
	  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
		
		ctx.beginPath();
    $('.mab-line').each(function(){
			let x1 = $(this).find('.p1-arm').val() * cx - minArm * cx
			let y1 = dy - $(this).find('.p1-weight').val() * cy + minWeight * cy
			let x2 = $(this).find('.p2-arm').val()  * cx - minArm * cx
			let y2 = dy - $(this).find('.p2-weight').val() * cy + minWeight * cy
	
			ctx.moveTo( x1, y1);
			ctx.lineTo( x2, y2);
		});
		ctx.stroke();
		
		
		//dessin ligne de vol
		let x1 = armResult * cx - minArm * cx;
		let y1 = dy - totalMass * cy + minWeight * cy;
		let x2 = armResultDry * cx - minArm * cx;
		let y2 = dy - totalMassDry * cy + minWeight * cy;
		let x3 = armResultLdg * cx - minArm * cx;
		let y3 = dy - totalMassLdg * cy + minWeight * cy;
		
		
		//dessin lignes t/o et zero fuel
		ctx.shadowBlur = 0;
		ctx.strokeStyle = 'hsla(217, 71%, 53%, 0.7)'
		ctx.fillStyle = 'hsla(217, 71%, 53%, 0.7)'
		ctx.textBaseline = "bottom";
		ctx.setLineDash([2, 4]);
		ctx.lineWidth = 1;
		
		ctx.beginPath();
		ctx.moveTo( x1, 0);
		ctx.lineTo( x1, dy);
		ctx.fillText(armResult.toFixed(2)+' m', x1+5, 15);
		ctx.moveTo( 0, y1);
		ctx.lineTo( dx, y1);
		ctx.fillText(totalMass.toFixed()+' kg', dx-50, y1-2);
		
		ctx.moveTo( x2, 0);
		ctx.lineTo( x2, dy);
		ctx.fillText(armResultDry.toFixed(2)+' m', x2+5, dy-3);
		ctx.moveTo( 0, y2);
		ctx.lineTo( dx, y2);
		ctx.fillText(totalMassDry.toFixed()+' kg', 5, y2-2);
		ctx.stroke();


		//Dessin landing
		if($('.input-row.is-fuel').get().length == 1){
			//ctx.strokeStyle = 'hsla(204, 86%, 53%, 0.7)'
			//ctx.fillStyle = 'hsla(204, 86%, 53%, 0.7)'
			
			ctx.strokeStyle = 'hsla(348, 100%, 61%, 0.7)'
			ctx.fillStyle = 'hsla(348, 100%, 61%, 0.7)'
			ctx.beginPath();
			
			ctx.moveTo( x3, 0);
			ctx.lineTo( x3, dy);
			
			ctx.moveTo( 0, y3);
			ctx.lineTo( dx, y3);
			ctx.stroke();
			
			//ctx.strokeStyle = 'hsl(204, 86%, 53%)'
			//ctx.fillStyle = 'hsl(204, 86%, 53%)'
			ctx.strokeStyle = 'hsl(348, 100%, 61%)'
			ctx.fillStyle = 'hsl(348, 100%, 61%)'
			ctx.fillText(armResultLdg.toFixed(2)+' m', x3+5, dy-15);
			ctx.fillText(totalMassLdg.toFixed()+' kg', 5, y3-2);
			
			
		}
		
		
		ctx.shadowBlur = 1;
		
		ctx.strokeStyle = 'hsl(217, 71%, 53%)'
		ctx.fillStyle = 'hsl(217, 71%, 53%)'
		ctx.textBaseline = "top";
		ctx.setLineDash([1,0]);
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo( x1, y1);
		ctx.lineTo( x2, y2);
		ctx.stroke();
		ctx.fillRect( x1 -5, y1 -5, 10, 10);
		ctx.fillRect( x2 -5, y2 -5, 10, 10);
		
		ctx.shadowBlur = 0;
		ctx.fillText('Décollage', x1+10, y1+2);
		ctx.fillText('Zero fuel', x2+10, y2+2);
		
		if($('.input-row.is-fuel').get().length == 1){
			
			//ctx.strokeStyle = 'hsl(204, 86%, 53%)'
			//ctx.fillStyle = 'hsl(204, 86%, 53%)'
			ctx.strokeStyle = 'hsl(348, 100%, 61%)'
			ctx.fillStyle = 'hsl(348, 100%, 61%)'
			
			ctx.beginPath();
			ctx.arc(x3, y3, 5, 0, 2 * Math.PI);
			ctx.fill();
			ctx.fillText('Atterrissage', x3+5, y3+2);
			/*ctx.fillRect( x3 -5, y3 -5, 10, 10);
			ctx.fillText('Atterrissage', x3+10, y3+2);*/
		}
		
		
  }

	//DISPLAYING LIMITS
	$('#limit_table tbody').empty();
	let classColor = ''
	
	let tr;
	
	tr = $('<tr>');
	tr.append($('<td>').text('Masse décollage'))
	if(totalMass > mtow) classColor = 'has-text-danger'; else classColor = 'has-text-success';
	tr.append($('<td>').text(totalMass.toFixed() + ' kg').addClass('has-text-weight-bold '+classColor))
	tr.append($('<td>').text(mtow.toFixed() + ' kg'))
	$('#limit_table tbody').append(tr);
	
	
	tr = $('<tr>');
	tr.append($('<td>').text('Masse zero fuel'))
	if(totalMassDry > mzfw) classColor = 'has-text-warning'; else classColor = 'has-text-success';
	tr.append($('<td>').text(totalMassDry.toFixed() + ' kg').addClass('has-text-weight-bold '+classColor))
	tr.append($('<td>').text(mzfw.toFixed() + ' kg'))
	$('#limit_table tbody').append(tr);
	
	tr = $('<tr>');
	tr.append($('<td>').text('Masse atterrissage'))
	if(landingMass > mlw) classColor = 'has-text-danger'; else classColor = 'has-text-success';
	tr.append($('<td>').text(landingMass.toFixed() + ' kg').addClass('has-text-weight-bold '+classColor))
	tr.append($('<td>').text(mlw.toFixed() + ' kg'))
	$('#limit_table tbody').append(tr);
	
	tr = $('<tr>');
	tr.append($('<td>').text('Carburant util. USG'))
	if(fuelLiters / 3.78541 > maxFuel / 3.78541) classColor = 'has-text-danger'; else classColor = 'has-text-success';
	tr.append($('<td>').text((fuelLiters / 3.78541).toFixed(1) + ' USG').addClass('has-text-weight-bold '+classColor))
	tr.append($('<td>').text((maxFuel / 3.78541).toFixed(1) + ' USG'))
	$('#limit_table tbody').append(tr);
	
	tr = $('<tr>');
	tr.append($('<td>').text('Carburant util. L'))
	if(fuelLiters > maxFuel) classColor = 'has-text-danger'; else classColor = 'has-text-success';
	tr.append($('<td>').text(fuelLiters.toFixed() + ' l').addClass('has-text-weight-bold '+classColor))
	tr.append($('<td>').text(maxFuel.toFixed() + ' l'))
	$('#limit_table tbody').append(tr);

}


function exportPdf(){
	$('.no-print').not('.hero').hide();
		$('.vert-header').css('transform', 'rotate(180deg)');
		$('.vert-header').css('transform', 'translate(-1.2cm)');
		let body = document.body
    let html = document.documentElement
    let height = Math.max(body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight)
    let element = document.getElementById('main_section');
    let heightCM = height / 35.35
      html2pdf(element, {
        margin: 1,
        filename: 'CarburantMasseCentrage.pdf',
        html2canvas: { dpi: 300, letterRendering: true },
        jsPDF: {
            orientation: 'portrait',
            unit: 'cm',
            format: [heightCM, 60]
          }
      }).then(function(){
				$('.no-print').show();
				$('.vert-header').css('transform', 'translate(0cm)');
				$('.vert-header').css('transform', 'rotate(180deg)');
				
			}, function(){
				$('.no-print').show();
				$('.vert-header').css('transform', 'translate(0cm)');
				$('.vert-header').css('transform', 'rotate(180deg)');
			});
}