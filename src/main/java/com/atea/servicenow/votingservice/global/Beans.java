package com.atea.servicenow.votingservice.global;

import com.atea.servicenow.votingservice.voting.repository.VotingRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Beans {

    @Bean
    public VotingRepository votingRepository(){
        return new VotingRepository();
    }

}
