package fr.colef.massandbalance.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.colef.massandbalance.entity.Aircraft;
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
}
