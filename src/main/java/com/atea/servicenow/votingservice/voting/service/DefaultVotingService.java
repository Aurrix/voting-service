package com.atea.servicenow.votingservice.voting.service;

import com.atea.servicenow.votingservice.participant.Participant;
import com.atea.servicenow.votingservice.questionaire.Question;
import com.atea.servicenow.votingservice.voting.Voting;
import com.atea.servicenow.votingservice.voting.model.NewVote;
import com.atea.servicenow.votingservice.voting.repository.VotingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.UUID;

@Service
public class DefaultVotingService implements VotingService {

  private final VotingRepository votingRepository;

  public DefaultVotingService(VotingRepository votingRepository) {
    this.votingRepository = votingRepository;
  }

  @Override
  public Voting start(NewVote newVote) {

    UUID uuid = UUID.randomUUID();

    Voting voting =
        Voting.builder()
            .name(newVote.getName())
            .active(true)
            .link(
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUri().toString()
                    + "/join/"
                    + uuid.toString())
            .description(newVote.getDescription())
            .id(uuid.toString())
            .key(newVote.getKey())
            .questions(new HashSet<>())
            .participants(new HashSet<>())
            .started(LocalDate.now())
            .build();

    votingRepository.addNew(voting);

    return voting;
  }

  @Override
  public void join(String voteId, Participant participant) {

    if (voteId == null || participant == null) return;

    Voting voting = votingRepository.getOne(voteId);
    participant.setName(participant.getName().trim());
    voting.getParticipants().add(participant);

    votingRepository.updateOne(voting);
  }

  @Override
  public void exit(String voteId, Participant participant) {
    Voting voting = votingRepository.getOne(voteId);
    voting.getParticipants().remove(participant);

    votingRepository.updateOne(voting);
  }

  @Override
  public void pingParticipant(String voteId, String participantName) {
    Voting voting = votingRepository.getOne(voteId);
    if (voting != null) {
      voting
          .getParticipants()
          .forEach(
              participant -> {
                if (participant.getName().equals(participantName))
                  participant.setPing(System.currentTimeMillis());
              });

      votingRepository.updateOne(voting);
    }
  }

  @Override
  public void addQuestion(String voteId, Question question) {
    Voting voting = votingRepository.getOne(voteId);

    if (voting != null) {
      voting.getQuestions().add(question);
    }

    votingRepository.updateOne(voting);
  }

  @Override
  public void update(Voting voting) {
    votingRepository.updateOne(voting);
  }

  @Override
  public Voting get(String voteId) {
    return votingRepository.getOne(voteId);
  }

//  @Override
//  public Question currentQuestion(String voteId) {
//    Voting voting = votingRepository.getOne(voteId);
//    for (Question question : voting.getQuestions()) {
//      if (question.isActive()) return question;
//    }
//    return null;
//  }
//
//  @Override
//  public Result currentResult(String voteId) {
//    Voting voting = votingRepository.getOne(voteId);
//    for (Question question : voting.getQuestions()) {
//      if (question.isActive())
//        for (Result result : voting.getResults()) {
//          if (result.getTitle().equals(question.getTitle())) return result;
//        }
//    }
//    return null;
//  }
//
//
//  @Override
//  public boolean isAnsweredOrObserver(String voteId, String question, Participant participant) {
//    if (participant.isObserver()) return true;
//
//    Voting voting = votingRepository.getOne(voteId);
//
//    if (voting == null || !voting.isActive()) return true;
//
//    for (Result result : voting.getResults()) {
//      if (result.getTitle().equals(question)
//          && result.getAnswered().contains(participant.getName())) return true;
//    }
//
//    return false;
//  }
//
//  @Override
//  public Result questionResults(String voteId, String question) {
//
//    Voting voting = votingRepository.getOne(voteId);
//
//    if (voting == null) return null;
//
//    for (Result result : voting.getResults()) {
//
//      if (result.getTitle().equals(question)) return result;
//    }
//
//    return null;
//  }
//
//  @Override
//  public void deleteQuestion(String id, String question) {
//    if (id == null || question == null) return;
//    Voting voting = votingRepository.getOne(id);
//    if (voting != null) {
//      voting.setQuestions(
//          voting.getQuestions().stream()
//              .filter(e -> !e.getTitle().trim().equals(question))
//              .collect(Collectors.toSet()));
//
//      votingRepository.updateOne(voting);
//    }
//  }
}
