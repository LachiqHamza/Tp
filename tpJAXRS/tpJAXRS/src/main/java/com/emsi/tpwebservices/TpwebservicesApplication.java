package com.emsi.tpwebservices;

import com.emsi.tpwebservices.entities.Compte;
import com.emsi.tpwebservices.entities.TypeCompte;
import com.emsi.tpwebservices.repository.CompteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class TpwebservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(TpwebservicesApplication.class, args);
	}

	@Bean
	CommandLineRunner start (CompteRepository compteRepository){
		return args -> {
			compteRepository.save(new Compte(null, Math.random()*9000, new
					Date(), TypeCompte.EPARGNE));
			compteRepository.save(new Compte(null, Math.random()*9000, new
					Date(), TypeCompte.COURANT));
			compteRepository.save(new Compte(null, Math.random()*9000, new
					Date(), TypeCompte.EPARGNE));
			compteRepository. findAll().forEach(c -> {
				System.out.println(c.toString());
			});

		};
	}

}
