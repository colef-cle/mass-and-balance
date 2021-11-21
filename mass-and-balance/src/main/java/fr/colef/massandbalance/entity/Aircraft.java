package fr.colef.massandbalance.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class Aircraft {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long						id;

	private String						registrationMark;

	private Float						emptyWeight;

	private Float						maximumTakeOffWeight;

	private Float						maximumLandingWeight;

	private Float						maximumZeroFuelWeight;

	@OneToMany( fetch = FetchType.EAGER, cascade = CascadeType.ALL )
	private List<MassAndBalanceLine>	limits;

	@OneToMany( fetch = FetchType.EAGER, cascade = CascadeType.ALL )
	private List<WeightStation>			weightStations;

}
