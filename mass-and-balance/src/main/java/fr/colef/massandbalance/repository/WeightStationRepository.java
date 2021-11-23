package fr.colef.massandbalance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.colef.massandbalance.entity.WeightStation;

@Repository
public interface WeightStationRepository extends JpaRepository<WeightStation, Long> {

}
