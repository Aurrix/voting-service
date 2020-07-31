package com.atea.servicenow.votingservice.voting.repository;

import com.atea.servicenow.votingservice.voting.Voting;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VotingRepository {

  private Map<String, Voting> repository = new ConcurrentHashMap<>();

  public synchronized void addNew(Voting voting) {
    if (repository.size() > 50) {
      Map<String, Voting> replacingMap = new ConcurrentHashMap<>();
      LocalDate limit = LocalDate.now().plus(1, ChronoUnit.DAYS);
      repository
          .values()
          .forEach(
              e -> {
                if (e.isActive() && !e.getStarted().isAfter(limit)) {
                  replacingMap.put(e.getId(), e);
                }
              });

      repository = replacingMap;
    }

    repository.put(voting.getId(), voting);
  }

  public synchronized void updateOne(Voting voting) {
    repository.put(voting.getId(), voting);
  }

  public synchronized Voting getOne(String id) {
    LocalDate limit = LocalDate.now().plus(1, ChronoUnit.DAYS);
    Voting voting = repository.get(id);
    removeInActiveParticipants(voting);
    if (voting != null && voting.isActive() && !voting.getStarted().isAfter(limit)) {
      return voting;
    } else if (voting != null && voting.isActive() && voting.getStarted().isAfter(limit)) {
      voting.setActive(false);
      repository.put(voting.getId(), voting);
      return null;
    } else return null;
  }

  private void removeInActiveParticipants(Voting voting) {
    if (voting != null) {
      voting
          .getParticipants()
          .removeIf(participant -> participant.getPing() + 6000 < System.currentTimeMillis());
      repository.put(voting.getId(), voting);
    }
  }
}
