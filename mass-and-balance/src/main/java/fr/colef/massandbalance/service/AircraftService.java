package fr.colef.massandbalance.service;

import java.util.Comparator;
import java.util.List;
import java.util.ListIterator;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.colef.massandbalance.entity.Aircraft;
import fr.colef.massandbalance.entity.MassAndBalanceLine;
import fr.colef.massandbalance.entity.WeightStation;
import fr.colef.massandbalance.repository.AircraftRepository;
import fr.colef.massandbalance.repository.MassAndBalanceLineRepository;
import fr.colef.massandbalance.repository.WeightStationRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AircraftService {

	@Autowired
	private AircraftRepository				aircraftRepository;

	@Autowired
	private WeightStationRepository			weightStationRepository;

	@Autowired
	private MassAndBalanceLineRepository	massAndBalanceLineRepository;

	@Transactional( readOnly = true )
	public Aircraft getAircraftById( Long id ) {
		Aircraft act = aircraftRepository.getById( id );

		List<MassAndBalanceLine> mabs = act.getMassAndBalanceLines().stream()
		                                   .sorted( Comparator.comparingLong( MassAndBalanceLine::getId ) )
		                                   .collect( Collectors.toList() );
		act.setMassAndBalanceLines( mabs );

		List<WeightStation> wss = act.getWeightStations().stream()
		                             .sorted( Comparator.comparingLong( WeightStation::getId ) )
		                             .collect( Collectors.toList() );
		act.setWeightStations( wss );
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
		Aircraft ref = aircraftRepository.getById( aircraft.getId() );
		aircraft.setWeightStations( ref.getWeightStations() );
		aircraft.setMassAndBalanceLines( ref.getMassAndBalanceLines() );
		return aircraftRepository.save( aircraft );
	}

	public WeightStation addNewWeightStation( Long aircraftId ) {
		WeightStation ws = new WeightStation();
		ws.setName( "new weight station" );
		weightStationRepository.save( ws );
		Aircraft act = aircraftRepository.findById( aircraftId ).get();
		act.getWeightStations().add( ws );
		aircraftRepository.save( act );
		return ws;
	}

	public WeightStation updateWeightStation( Long aircraftId, WeightStation ws ) {
		Aircraft act = aircraftRepository.findById( aircraftId ).get();
		act.getWeightStations().forEach( w -> {
			if ( w.getId() == ws.getId() ) {
				w.setArm( ws.getArm() );
				w.setDefaultWeight( ws.getDefaultWeight() );
				w.setMaxWeight( ws.getMaxWeight() );
				w.setName( ws.getName() );
				w.setIsFuel( ws.getIsFuel() );
				w.setIsEditable( ws.getIsEditable() );
			}
		} );
		aircraftRepository.save( act );
		return ws;
	}

	public void deleteWeightStation( Long actId, Long wsId ) {
		Aircraft act = aircraftRepository.findById( actId ).get();
		ListIterator<WeightStation> iter = act.getWeightStations().listIterator();
		while ( iter.hasNext() ) {
			if ( iter.next().getId().equals( wsId ) ) {
				iter.remove();
			}
		}
		aircraftRepository.save( act );
	}

	public MassAndBalanceLine addMassAndBalanceLine( Long aircraftId ) {
		MassAndBalanceLine mab = new MassAndBalanceLine();
		massAndBalanceLineRepository.save( mab );
		Aircraft act = aircraftRepository.findById( aircraftId ).get();
		act.getMassAndBalanceLines().add( mab );
		aircraftRepository.save( act );
		return mab;
	}

	public MassAndBalanceLine updateMassAndBalanceLine( Long aircraftId, MassAndBalanceLine mab ) {
		Aircraft act = aircraftRepository.findById( aircraftId ).get();
		act.getMassAndBalanceLines().forEach( m -> {
			if ( m.getId() == mab.getId() ) {
				m.setP1Arm( mab.getP1Arm() );
				m.setP1Weight( mab.getP1Weight() );
				m.setP2Arm( mab.getP2Arm() );
				m.setP2Weight( mab.getP2Weight() );
			}
		} );
		aircraftRepository.save( act );
		return mab;
	}

	public void deleteMassAndBalanceLine( Long actId, Long mabId ) {
		Aircraft act = aircraftRepository.findById( actId ).get();
		ListIterator<MassAndBalanceLine> iter = act.getMassAndBalanceLines().listIterator();
		while ( iter.hasNext() ) {
			if ( iter.next().getId().equals( mabId ) ) {
				iter.remove();
			}
		}
		aircraftRepository.save( act );
	}

}
