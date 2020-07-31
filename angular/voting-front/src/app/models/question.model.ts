import {ResponseModel} from './response.model';

export class QuestionModel {
  position: string;
  title: string;
  description: string;
  responses: ResponseModel[];
  answered: string[];
  active: boolean;
}
