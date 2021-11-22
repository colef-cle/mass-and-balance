package fr.colef.massandbalance.service;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.colef.massandbalance.AircraftRepository;
import fr.colef.massandbalance.entity.Aircraft;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AircraftService {

	@Autowired
	private AircraftRepository aircraftRepository;

	@Transactional( readOnly = true )
	public Aircraft getAircraftById( Long id ) {
		Aircraft act = aircraftRepository.getById( id );
		Hibernate.initialize( act.getLimits() );
		Hibernate.initialize( act.getWeightStations() );
		return act;
	}

	public List<Aircraft> getAllAircrafts() {
		return aircraftRepository.findAll( Sort.by( Sort.Direction.ASC, "registrationMark" ) );
	}

	public Aircraft instantiateAircraft() {
		log.info( "Instantiating new aircraft" );
		Aircraft act = new Aircraft();
		act.setRegistrationMark( "NEW" );
		aircraftRepository.save( act );
		return act;
	}

	public Aircraft updateAircraft( Aircraft aircraft ) {
		log.info( "Update aircraft" );
		return aircraftRepository.save( aircraft );
	}

}
