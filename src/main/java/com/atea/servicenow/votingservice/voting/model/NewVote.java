package com.atea.servicenow.votingservice.voting.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class NewVote {
  @NotBlank
  private String name;
  private String description;
  private String key;
}
