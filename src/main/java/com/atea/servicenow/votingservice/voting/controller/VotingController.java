package com.atea.servicenow.votingservice.voting.controller;

import com.atea.servicenow.votingservice.participant.Participant;
import com.atea.servicenow.votingservice.questionaire.Question;
import com.atea.servicenow.votingservice.questionaire.responses.Response;
import com.atea.servicenow.votingservice.voting.Voting;
import com.atea.servicenow.votingservice.voting.model.NewVote;
import com.atea.servicenow.votingservice.voting.service.VotingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("/voting")
public class VotingController {

  private final VotingService votingService;

  public VotingController(VotingService votingService) {
    this.votingService = votingService;
  }

  @PostMapping("/new")
  public ResponseEntity<Void> startNew(@RequestBody @Valid NewVote newVote) {
    MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
    headers.add(
        "Location",
        ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()
            + "/voting/"
            + votingService.start(newVote).getId());
    headers.add("Access-Control-Expose-Headers", "Location");
    return new ResponseEntity<>(headers, HttpStatus.CREATED);
  }

  @PostMapping("/join/{id}")
  public void join(@PathVariable String id, @RequestBody @Valid Participant participant) {
    votingService.join(id, participant);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Voting> getVoting(@PathVariable String id) {
    return ResponseEntity.ok(this.votingService.get(id));
  }

  @PutMapping("/{id}/ping/{participantName}")
  public ResponseEntity<Void> pingParticipant(
      @PathVariable String id, @PathVariable String participantName) {
    votingService.pingParticipant(id, participantName);
    return ResponseEntity.accepted().build();
  }

  @PostMapping(value = "/{id}/question")
  public ResponseEntity<Void> addQuestion(
      @PathVariable String id, @RequestBody @Valid Question question) {
    votingService.addQuestion(id, question);
    return ResponseEntity.accepted().build();
  }

  @PutMapping("/{id}")
  public void update(@PathVariable String id, @RequestBody @Valid Voting voting) {
    voting.setId(id);
    votingService.update(voting);
  }
}
