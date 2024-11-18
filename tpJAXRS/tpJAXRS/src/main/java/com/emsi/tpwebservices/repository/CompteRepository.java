package com.emsi.tpwebservices.repository;

import com.emsi.tpwebservices.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte,Long> {
}
