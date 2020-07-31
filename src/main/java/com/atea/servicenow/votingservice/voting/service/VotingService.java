package com.atea.servicenow.votingservice.voting.service;

import com.atea.servicenow.votingservice.participant.Participant;
import com.atea.servicenow.votingservice.questionaire.Question;
import com.atea.servicenow.votingservice.voting.Voting;
import com.atea.servicenow.votingservice.voting.model.NewVote;

public interface VotingService {
  Voting start(NewVote newVote);

  void join(String voteId, Participant participant);

  void exit(String voteId, Participant participant);

  void pingParticipant(String voteId, String participantName);

  void addQuestion(String voteId, Question question);

  void update(Voting voting);

  Voting get(String voteId);

}
