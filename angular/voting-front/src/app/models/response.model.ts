export class ResponseModel {
  name: string;
  votes: number;

  constructor(name: string, votes: number) {
    this.name = name;
    this.votes = votes;
  }
}
