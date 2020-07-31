import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VotingService} from '../../services/voting.service';
import {QuestionModel} from '../../models/question.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ResponseModel} from '../../models/response.model';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {

  public responses = new MatTableDataSource();
  public form: FormGroup;
  public inputValid = true;
  private voteId;
  private voting;
  @ViewChild('responseInput') responseInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private votingService: VotingService,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      title: ['', [Validators.required, Validators.min(3)]],
      description: ['', [Validators.min(3)]],
    });
    this.voteId = data.id;
    this.votingService.get(this.voteId).toPromise().then(result => {
      this.voting = result;
    });
  }

  public deleteResponseRow(index) {
    if (index >= 0) {
      const newData = [];
      let count = 0;
      this.responses.data.forEach(entry => {
        if (count !== index) {
          newData.push(entry);
        }
        count++;
      });
      this.responses.data = newData;
    }
  }

  public addResponse() {
    const inputText = this.responseInput.nativeElement.value;
    if (this.isUniqueResponseValue(inputText) && inputText !== '') {
      this.inputValid = true;
      const data = this.responses.data;
      data.push(inputText);
      this.responses.data = data;
    } else {
      this.inputValid = false;
    }
  }

  private validateResponses(): boolean {
    return this.responses.data.length > 1;
  }

  private isUniqueResponseValue(value: string) {
    return this.responses.data.indexOf(value) < 0;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    if (this.form.valid && this.validateResponses()) {
      this.inputValid = true;
      const question = new QuestionModel();
      question.responses = [];
      this.responses.data.forEach(element => {
        question.responses.push(new ResponseModel(element as string, 0));
      });
      question.position = this.voting.questions ? this.voting.questions.length : 1;
      question.title = this.title.value;
      question.description = this.description.value;
      this.votingService.addQuestion(this.voteId, question).toPromise().then(
        () => {
          this.onNoClick();
        }
      );
    } else {
      this.inputValid = false;
    }
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
}
