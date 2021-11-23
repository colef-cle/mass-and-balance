package fr.colef.massandbalance.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.colef.massandbalance.entity.Aircraft;
import fr.colef.massandbalance.entity.MassAndBalanceLine;
import fr.colef.massandbalance.entity.WeightStation;
import fr.colef.massandbalance.service.AircraftService;

@RestController
@RequestMapping( "api/aircraft" )
public class AircraftResource {

	@Autowired
	private AircraftService aircraftService;

	@GetMapping( "instantiate" )
	public Aircraft instantiateAircraft() {
		return aircraftService.instantiateAircraft();
	}

	@PutMapping
	public Aircraft updateAircraft( @RequestBody Aircraft aircraft ) {
		return aircraftService.updateAircraft( aircraft );
	}

	@GetMapping( "/{id}/weightstation/instantiate" )
	public WeightStation addNewWeightStation( @PathVariable( "id" ) Long aircraftId ) {
		return aircraftService.addNewWeightStation( aircraftId );
	}

	@PutMapping( "/{id}/weightstation" )
	public WeightStation updateWS( @RequestBody WeightStation ws, @PathVariable( "id" ) Long aircraftId ) {
		return aircraftService.updateWeightStation( aircraftId, ws );
	}

	@DeleteMapping( "/{actId}/weightstation/{wsId}" )
	public void deleteWS( @PathVariable( "actId" ) Long actId, @PathVariable( "wsId" ) Long wsId ) {
		aircraftService.deleteWeightStation( actId, wsId );
	}

	@GetMapping( "/{id}/massandbalanceline/instantiate" )
	public MassAndBalanceLine addNewMassAndBalanceLine( @PathVariable( "id" ) Long aircraftId ) {
		return aircraftService.addMassAndBalanceLine( aircraftId );
	}

	@PutMapping( "/{id}/massandbalanceline" )
	public MassAndBalanceLine updateMabLine( @RequestBody MassAndBalanceLine mab,
	        @PathVariable( "id" ) Long aircraftId ) {
		return aircraftService.updateMassAndBalanceLine( aircraftId, mab );
	}

	@DeleteMapping( "/{actId}/massandbalanceline/{mabId}" )
	public void deleteMabLine( @PathVariable( "actId" ) Long actId, @PathVariable( "mabId" ) Long mabId ) {
		aircraftService.deleteMassAndBalanceLine( actId, mabId );
	}
}
