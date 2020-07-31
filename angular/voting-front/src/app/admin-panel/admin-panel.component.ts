import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VotingService} from '../services/voting.service';
import {MatDialog} from '@angular/material/dialog';
import {QuestionModalComponent} from './question-modal/question-modal.component';
import {VotingModel} from '../models/voting.model';
import {interval} from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public keyEntered = false;
  public key: string;

  private id: string;

  public copyBtnText = 'Link';

  public voting: VotingModel = new VotingModel();


  constructor(private actRoute: ActivatedRoute, private votingService: VotingService, private matDialog: MatDialog) {
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

  public chartLabels(questionTitle: string) {
    const labels = [];
    this.voting.questions.forEach(question => {
      if (question.title === questionTitle) {
        question.responses.forEach(response => {
          labels.push(response.name);
        });
      }
    });
    return labels;
  }

  public chartData(questionTitle: string) {
    const data = [];
    this.voting.questions.forEach(question => {
      if (question.title === questionTitle) {
        question.responses.forEach(response => {
          data.push(response.votes);
        });
      }
    });
    return data;
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.update();
    interval(3000).subscribe(() => {
      this.update();
    });
  }

  public addQuestionModal() {
    this.matDialog.open(QuestionModalComponent, {width: '75%', data: {id: this.id}});
    this.update();
  }

  public copyToClip() {
    this.copyBtnText = 'Copied';
  }

  public removeQuestion(questionName: string) {
    const newArray = [];
    this.voting.questions.forEach((element => {
      if (questionName !== element.title) {
        newArray.push(element);
      }
    }));
    this.voting.questions = newArray;
    this.votingService.updateVoting(this.voting).toPromise().then();
    this.sort();
    this.update();
  }

  public toggleQuestion(questionName: string) {
    this.voting.questions.forEach((question => {
      if (question.title === questionName) {
        if (question.active) {
          question.active = false;
        } else {
          if (question.answered && question.answered.length > 0) {
            question.answered = [];
            question.responses.forEach(response => {
              response.votes = 0;
            });
          } else {
            question.active = true;
          }
        }
      } else {
        question.active = false;
      }
    }));
    this.votingService.updateVoting(this.voting).toPromise().then();
    this.sort();
    this.update();
  }

  public answered(question: string): boolean {
    let result = false;
    this.voting.questions.forEach(questionElement => {
      if (questionElement.title === question && questionElement.answered && questionElement.answered.length > 0) {
        result = true;
      }
    });
    return result;
  }

  private update() {
    this.votingService.get(this.id).toPromise().then(data => {
      this.voting = data;
      this.sort();
    });
  }

  private sort() {
    this.voting.questions.sort((a, b) => (a.position < b.position ? -1 : 1));
  }

  public enterKey() {
    console.log(this.key, this.voting.key);
    if (this.key === this.voting.key) {
      this.keyEntered = true;
    }
  }
}

