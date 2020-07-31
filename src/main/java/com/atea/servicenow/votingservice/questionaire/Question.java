package com.atea.servicenow.votingservice.questionaire;

import com.atea.servicenow.votingservice.questionaire.responses.Response;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Question {
    private int position=0;
    private String title;
    private String description;
    private Set<Response> responses;
    private Set<String> answered;
    private boolean active=false;
}
