import {Injectable} from '@angular/core';
import {NewVotingModel} from '../models/new.voting.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {VotingModel} from '../models/voting.model';
import {ParticipantModel} from '../models/participant.model';

@Injectable({providedIn: 'root'})
export class VotingService {

  constructor(private http: HttpClient) {
  }

  public submitNew(model: NewVotingModel): Observable<any> {
    return this.http.post(environment.baseUrl + 'voting/new', model, {observe: 'response'});
  }

  public get(id: string): Observable<any> {
    return this.http.get<VotingModel>(environment.baseUrl + 'voting/' + id);
  }

  public updateVoting(votingModel: VotingModel): Observable<any> {
    return this.http.put(environment.baseUrl + 'voting/' + votingModel.id, votingModel);
  }

  public joinVoting(voteId: string, participant: ParticipantModel) {
    return this.http.post(environment.baseUrl + 'voting/join/' + voteId, participant);
  }

  public pingParticipant(voteId: string, participant: string) {
    return this.http.put(environment.baseUrl + 'voting/' + voteId + '/ping/' + participant, '', {observe: 'response'});
  }

  public addQuestion(voteId: string, question) {
    return this.http.post(environment.baseUrl + 'voting/' + voteId + '/question', question);
  }
}
