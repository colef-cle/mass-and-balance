package fr.colef.massandbalance.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table
public class WeightStation {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long	id;

	private String	name;

	private Float	arm;

	private Float	maxWeight;

	private Float	defaultWeight;

	private Boolean	isFuel;

	private Boolean	isEditable	= true;

}
