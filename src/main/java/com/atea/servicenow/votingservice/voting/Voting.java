package com.atea.servicenow.votingservice.voting;

import com.atea.servicenow.votingservice.participant.Participant;
import com.atea.servicenow.votingservice.questionaire.Question;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voting {
    private String id;
    private String link;
    private String key;
    @NotNull
    private String name;
    private String description;
    private boolean launched;
    private LocalDate started;
    private boolean active;
    private Set<Participant> participants;
    private Set<Question> questions;
}
