package fr.colef.massandbalance.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table
@Data
public class Aircraft {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long						id;

	private String						registrationMark;

	private Float						maxFuel;

	private Float						maximumTakeOffWeight;

	private Float						maximumLandingWeight;

	private Float						maximumZeroFuelWeight;

	private Float						defaultFuelDensity;

	private Float						fuelFlow;

	private String						imageUrl;

	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private List<MassAndBalanceLine>	massAndBalanceLines;

	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	@JsonIgnoreProperties( { "hibernateLazyInitializer", "handler" } )
	private List<WeightStation>			weightStations;

}
