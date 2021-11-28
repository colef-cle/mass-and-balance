package fr.colef.massandbalance.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@NoArgsConstructor
@Data
public class Operator {

	@Id
	@GeneratedValue
	private Long			id;

	private String			code;

	private String			name;

	@OneToMany
	private List<Aircraft>	aircrafts;

}
