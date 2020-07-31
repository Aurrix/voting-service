package com.atea.servicenow.votingservice.participant;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class Participant {
  @NotNull
  private String name;
  @NotNull
  private boolean observer;
  @JsonIgnore
  private long ping=System.currentTimeMillis();
}
