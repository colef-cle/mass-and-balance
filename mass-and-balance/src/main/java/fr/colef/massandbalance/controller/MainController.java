package fr.colef.massandbalance.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping( "/home" )
	private String getMainPage() {
		return "main";
	}

	@GetMapping( "/admin" )
	private String getAdminPage() {
		return "admin";
	}

}
