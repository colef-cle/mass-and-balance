$(document).ready(function(){
	
	$('.mab-field').on('input', function(){
		refreshMab($(this))
	});
	
	$('.mab-field').each(function(){
		if($(this).val()){
			refreshMab($(this))
		}
		
	});
	
});



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
		const fuelL = updatedTr.find('.fuel-l').val();
		const fuelKg = fuelL * updatedField.val();
		updatedTr.find('.fuel-kg').val(fuelKg.toFixed(1));
	}
	
	//calcul des moments
	let momentTotal = 0;
	let totalMass = 0;
	
	$('.input-row').each(function(){
		let tr = $(this);
		
		if(tr.find('.mab-weight').val()){
			let mass = tr.find('.mab-weight').val() * 1.0;
			totalMass+= mass;
			let moment = tr.find('.mab-weight').val() * tr.find('.mab-arm').text();
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
		}
		
		
	});
	
	let armResult = momentTotal/totalMass;
	
	$('.result-row .mab-moment').text(momentTotal.toFixed(1));
	$('.result-row .mab-weight').text(totalMass.toFixed(1));
	$('.result-row .mab-arm').text(armResult.toFixed(1));
	
	let mtow = $('#mtow').text() * 1.0;
	let mlw = $('#mlw').text() * 1.0;
	let mzfw = $('#mzfw').text() * 1.0;
	
	if(totalMass > mtow){
		$('.result-row .mab-weight').addClass("has-text-danger")
	}else{
		$('.result-row .mab-weight').removeClass("has-text-danger")
	}
	
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
	
	//drawing canevas
	let canvas = document.getElementById('mab_canvas');
	
	let dy = canvas.offsetHeight;
	let cx = canvas.offsetWidth / (maxArm - minArm);
	let cy = canvas.offsetHeight / (maxWeight - minWeight);
	
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
	
	if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

		ctx.strokeStyle = 'hsl(171, 100%, 41%)'
		ctx.lineWidth = 2
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
		
		
		ctx.strokeStyle = 'hsl(348, 100%, 61%)'
		ctx.fillStyle = 'hsl(348, 100%, 61%)'
		let x1 = armResult * cx - minArm * cx;
		let y1 = dy - totalMass * cy + minWeight * cy;
		ctx.fillRect( x1 -5, y1 -5, 10, 10);
		
		
  }

}
