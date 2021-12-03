package fr.colef.massandbalance.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import fr.colef.massandbalance.entity.Aircraft;
import fr.colef.massandbalance.service.AircraftService;

@Controller
public class MainController {

	@Autowired
	private AircraftService aircraftService;

	@GetMapping( "/" )
	private String getPage() {
		return "redirect:/home";
	}

	@GetMapping( "/home" )
	private String getHomePage( Model model ) {
		model.addAttribute( "operators", aircraftService.getOperatorsWithAircraftsAsMap() );
		return "home";
	}

	@GetMapping( "/main070319" )
	private String getMainPage( Model model ) {
		model.addAttribute( "operators", aircraftService.getOperatorsWithAircraftsAsMap() );
		return "main";
	}

	@GetMapping( "/{operatorKey}" )
	private String getOperatorPage( @PathVariable( "operatorKey" ) String operatorKey, Model model ) {
		Map<String, List<Aircraft>> map = aircraftService.getOperatorsWithAircraftsAsMap( operatorKey );
		if ( map == null || map.isEmpty() ) {
			return "redirect:/home";
		}
		model.addAttribute( "operators", map );
		return "main";
	}

	@GetMapping( "/operatorofactid/{id}" )
	private String getOperatorPageWithAircraftId( @PathVariable( "id" ) Long aircraftId ) {
		if ( aircraftId != null ) {
			Aircraft act = aircraftService.getAircraftById( aircraftId );
			return "redirect:/" + act.getOperatorName().toLowerCase().replace( " ", "" ).replace( "ç", "c" );
		}
		return "redirect:/home";
	}

	@GetMapping( "/mab/{id}" )
	private String getMabPage( @PathVariable( "id" ) Long aircraftId, Model model ) {
		if ( aircraftId != null ) {
			model.addAttribute( "aircraft", aircraftService.getAircraftById( aircraftId ) );
		}
		return "mab";
	}

	@GetMapping( "/admin070319" )
	private String getAdminPage( @RequestParam( value = "actId", required = false ) Long aircraftId, Model model ) {
		model.addAttribute( "aircrafts", aircraftService.getAllAircrafts() );

		if ( aircraftId != null ) {
			model.addAttribute( "aircraft", aircraftService.getAircraftById( aircraftId ) );
		}

		return "admin";
	}

}
