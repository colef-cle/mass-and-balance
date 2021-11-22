package fr.colef.massandbalance.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;

@Entity
@Data
public class WeightStation {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long	id;

	@Getter
	private String	name;

	private Float	arm;

	private Float	maxWeight;

	private Float	defaultWeight;

}
