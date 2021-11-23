package fr.colef.massandbalance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.colef.massandbalance.entity.Aircraft;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {

}
