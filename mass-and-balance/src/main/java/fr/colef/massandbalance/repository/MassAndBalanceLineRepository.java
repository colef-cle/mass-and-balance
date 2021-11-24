package fr.colef.massandbalance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.colef.massandbalance.entity.MassAndBalanceLine;

public interface MassAndBalanceLineRepository extends JpaRepository<MassAndBalanceLine, Long> {

}
