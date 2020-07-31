import {ParticipantModel} from './participant.model';
import {QuestionModel} from './question.model';

export class VotingModel {
  id: string;
  link: string;
  key: string;
  name: string;
  description: string;
  launched: boolean;
  active: boolean;
  participants: Array<ParticipantModel>;
  questions: Array<QuestionModel>;
}
