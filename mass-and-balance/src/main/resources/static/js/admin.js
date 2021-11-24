$(document).ready(function(){
	$('#add_aircraft_btn').click(function(){
		addAircraft();
	});
	
	$('.act-field').change(function(){
		updateAircraft();
	});
	
	$('#add_weight_station_btn').click(function(){
		addWeightStation();
	});
	
	$('.ws-field').change(function(){
		updateWeightStation($(this).closest('tr'));
	});
	
	$('.ws-delete').click(function(){
		deleteWeightStation($(this).closest('tr'));
	});
	
	$('#add_mass_and_balance_line_btn').click(function(){
		addMassAndBalanceLine();
	});
	
	$('.mab-field').change(function(){
		updateMassAndBalanceLine($(this).closest('tr'));
	});
	
	$('.mab-delete').click(function(){
		deleteMassAndBalanceLine($(this).closest('tr'));
	});
	
	if($('#act_fuel_flow').val()){
		$('#act_fuel_flow_usg').val( ($('#act_fuel_flow').val() / 3.78541).toFixed(1) )
	}
	
	$('#act_fuel_flow_usg').on('input', function(){
		$('#act_fuel_flow').val( ($('#act_fuel_flow_usg').val() * 3.78541).toFixed(1) )
	})
	
	$('#act_fuel_flow').on('input', function(){
		$('#act_fuel_flow_usg').val( ($('#act_fuel_flow').val() / 3.78541).toFixed(1) )
	})
	
});

function addAircraft(){
	$.ajax({url: window.location.origin+"/api/aircraft/instantiate"})
	.done(function(act){
		$('#aircraft_list').append($('<li>')
													.append($('<a>').text(act.registrationMark)
													.attr('href', window.location.origin+'/admin?actId='+act.id)));
		
	})
	.fail(function(err){
		alert('Error whil creating new aircraft');
	})
	.always();
}


function addMassAndBalanceLine(){
	$.ajax({url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/massandbalanceline/instantiate"})
	.done(function(mab){
		const tr = $('<tr>').append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small mab-field mab-p1-arm')
																					.css('border-width','0px')
																					.val(mab.p1Arm)
																					.change(function(){updateMassAndBalanceLine(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small mab-field mab-p1-weight')
																					.css('border-width','0px')
																					.val(mab.p1Weight)
																					.change(function(){updateMassAndBalanceLine(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small mab-field mab-p2-arm')
																					.css('border-width','0px')
																					.val(mab.p2Arm)
																					.change(function(){updateMassAndBalanceLine(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small mab-field mab-p2-weight')
																					.css('border-width','0px')
																					.val(mab.p2Weight)
																					.change(function(){updateMassAndBalanceLine(tr);})))
									.append($('<td>').addClass('p-0')
											.html('<a class="button is-small is-danger px-1 mab-delete"><i class="fas fa-trash fa-lg"></i></a>')
											.click(function(){deleteMassAndBalanceLine(tr);}))
											
		tr.data('mabId', mab.id);
		$('#mab_line_table tbody').append(tr);
	})
	.fail(function(err){
		alert('Error while creating new weight station');
	})
	.always();
}

function updateMassAndBalanceLine(tr){
	const mab = {};
	mab['id'] = tr.data('mabId');
	mab['p1Arm'] = tr.find('.mab-p1-arm').val();
	mab['p1Weight'] = tr.find('.mab-p1-weight').val();
	mab['p2Arm'] =  tr.find('.mab-p2-arm').val();
	mab['p2Weight'] =  tr.find('.mab-p2-weight').val();
	$.ajax({
		url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/massandbalanceline", 
		method: 'PUT',
		data: JSON.stringify(mab),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
	}).done()
	.fail(function(){
		alert('It was not possible to save the changes');
	})
}

function deleteMassAndBalanceLine(tr){
	$.ajax({
		url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/massandbalanceline/"+tr.data('mabId'), 
		method: 'DELETE'
	}).done(function(){
		tr.remove();
	})
	.fail(function(){
		alert('It was not possible to delete');
	})
}





function addWeightStation(){
	$.ajax({url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/weightstation/instantiate"})
	.done(function(ws){
		const tr = $('<tr>').append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small ws-field ws-name')
																					.css('border-width','0px')
																					.val(ws.name)
																					.change(function(){updateWeightStation(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small ws-field ws-arm')
																					.css('border-width','0px')
																					.val(ws.arm)
																					.change(function(){updateWeightStation(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small ws-field ws-max-weight')
																					.css('border-width','0px')
																					.val(ws.maxWeight)
																					.change(function(){updateWeightStation(tr);})))
									.append($('<td>').addClass('p-0')
											.append($('<input>').addClass('input is-small ws-field ws-default-weight')
																					.css('border-width','0px')
																					.val(ws.defaultWeight)
																					.change(function(){updateWeightStation(tr);})))
									.append($('<td>').addClass('p-0 has-text-centered')
											.append($('<input>').addClass('checkbox is-small ws-field ws-is-fuel')
																					.attr('type','checkbox')
																					.prop('checked', ws.isFuel)
																					.change(function(){updateWeightStation(tr);})))				
									.append($('<td>').addClass('p-0 has-text-centered')
											.append($('<input>').addClass('checkbox is-small ws-field ws-is-editable')
																					.attr('type','checkbox')
																					.prop('checked', ws.isEditable)
																					.change(function(){updateWeightStation(tr);})))																								
									
									.append($('<td>').addClass('p-0')
											.html('<a class="button is-small is-danger px-1 ws-delete"><i class="fas fa-trash fa-lg"></i></a>')
											.click(function(){deleteWeightStation(tr);}))
											
		tr.data('wsId', ws.id);
		$('#ws_table tbody').append(tr);
	})
	.fail(function(err){
		alert('Error while creating new weight station');
	})
	.always();
}

function updateWeightStation(tr){
	const ws = {};
	ws['id'] = tr.data('wsId');
	ws['name'] = tr.find('.ws-name').val();
	ws['arm'] = tr.find('.ws-arm').val();
	ws['maxWeight'] =  tr.find('.ws-max-weight').val();
	ws['defaultWeight'] =  tr.find('.ws-default-weight').val();
	ws['isFuel'] = tr.find('.ws-is-fuel').prop('checked');
	ws['isEditable'] = tr.find('.ws-is-editable').prop('checked');
	$.ajax({
		url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/weightstation", 
		method: 'PUT',
		data: JSON.stringify(ws),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
	}).done()
	.fail(function(){
		alert('It was not possible to save the changes');
	})
}

function deleteWeightStation(tr){
	
	$.ajax({
		url: window.location.origin+"/api/aircraft/"+$('#aircraft_container').data('actId')+"/weightstation/"+tr.data('wsId'), 
		method: 'DELETE'
	}).done(function(){
		tr.remove();
	})
	.fail(function(){
		alert('It was not possible to delete');
	})
}

function updateAircraft(){
	const act = {};
	act['id'] = $('#aircraft_container').data('actId');
	act['registrationMark'] = $('#act_registration_mark').val()
	act['emptyWeight'] = $('#act_empty_weight').val()
	act['maximumTakeOffWeight'] = $('#act_maximum_take_off_weight').val()
	act['maximumLandingWeight'] = $('#act_maximum_landing_weight').val()
	act['maximumZeroFuelWeight'] = $('#act_maximum_zero_fuel_weight').val()
	act['fuelFlow'] = $('#act_fuel_flow').val()
	act['defaultFuelDensity'] = $('#act_default_fuel_density').val()
	act['imageUrl'] = $('#act_image_url').val()
	$.ajax({
		url: window.location.origin+"/api/aircraft", 
		method: 'PUT',
		data: JSON.stringify(act),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
	}).done(function(back){
		$('#aircraft_list a.is-active').text(back.registrationMark)
	})
	.fail(function(){
		alert('It was not possible to save the changes');
	})
	
	
	
}