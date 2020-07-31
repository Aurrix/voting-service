import {Component, OnInit} from '@angular/core';
import {VotingModel} from '../models/voting.model';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';
import {QuestionModel} from '../models/question.model';

@Component({
  selector: 'app-vote-panel',
  templateUrl: './vote-panel.component.html',
  styleUrls: ['./vote-panel.component.scss']
})
export class VotePanelComponent implements OnInit {
  private id: string;
  private participant: string;
  public voting: VotingModel;
  public activeQuestion: QuestionModel;
  public isObserver = false;
  public color = [];

  constructor(private votingService: VotingService,
              private router: Router,
              private actRoute: ActivatedRoute) {
  }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
  };
  public chartType = 'doughnut';

  public chartLabels() {
    const labels = [];
    this.activeQuestion.responses.forEach(response => {
      labels.push(response.name);
    });
    return labels;
  }

  public chartData() {
    const data = [];
    this.activeQuestion.responses.forEach(response => {
      data.push(response.votes);
    });
    return data;
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(data => {
        this.id = data.get('id');
        this.participant = data.get('participant');
      }
    );
    this.votingService.get(this.id).toPromise().then(result => {
      this.voting = result;
    });
    this.checkIfObserver();
    interval(3000).subscribe(() => {
      this.votingService.pingParticipant(this.id, this.participant).toPromise().then(result => {
        // console.log(result);
      });
      this.votingService.get(this.id).toPromise().then(result => {
        this.voting = result;
        this.setCurrentQuestion(result);
      });
      // console.log(this.voting);
      // console.log(this.activeQuestion, !this.isObserver);
      // console.log((this.activeQuestion && !this.isObserver));
      // console.log(this.id, this.participant);
    });
    for (let i = 0; i < 64; i++) {
      this.color.push(this.randomColor());
    }
  }

  public submitAnswer(response: string) {

    this.voting.questions.forEach(question => {
      if (question.title === this.activeQuestion.title) {
        if (question.answered == null) {
          question.answered = [];
        }
        question.answered.push(this.participant);
        question.responses.forEach(responseElement => {
          if (responseElement.name === response) {
            responseElement.votes++;
          }
        });
      }
    });
    this.votingService.updateVoting(this.voting).toPromise().then();
    this.setCurrentQuestion(this.voting);
  }

  private checkIfObserver() {
    if (this.voting) {
      this.voting.participants.forEach(participant => {
        if (participant.name === this.participant) {
          this.isObserver = participant.observer;
        }
      });
    }
  }

  public isAnswered() {
    if (!this.activeQuestion) {
      return false;
    }
    return this.activeQuestion.answered.indexOf(this.participant) >= 0;
  }

  private setCurrentQuestion(voting) {
    voting.questions.forEach(question => {
      if (question.active) {
        if (!question.answered || (question.answered && question.answered.indexOf(this.participant) < 0)) {
          this.activeQuestion = question;
        }
      }
    });
    // console.log(this.activeQuestion);
    // console.log(this.voting);
  }

  public randomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
