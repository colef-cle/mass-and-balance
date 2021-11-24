package fr.colef.massandbalance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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
	private String getMainPage( Model model ) {

		model.addAttribute( "aircrafts", aircraftService.getAllAircrafts() );
		return "main";
	}

	@GetMapping( "/mab/{id}" )
	private String getMabPage( @PathVariable( "id" ) Long aircraftId, Model model ) {
		if ( aircraftId != null ) {
			model.addAttribute( "aircraft", aircraftService.getAircraftById( aircraftId ) );
		}
		return "mab";
	}

	@GetMapping( "/admin" )
	private String getAdminPage( @RequestParam( value = "actId", required = false ) Long aircraftId, Model model ) {
		model.addAttribute( "aircrafts", aircraftService.getAllAircrafts() );

		if ( aircraftId != null ) {
			model.addAttribute( "aircraft", aircraftService.getAircraftById( aircraftId ) );
		}

		return "admin";
	}

}
