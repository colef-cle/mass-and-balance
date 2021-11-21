package fr.colef.massandbalance.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class WeightStation {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long	id;

	private String	name;

	private float	weightArm;

}
