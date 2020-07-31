import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../services/voting.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {VotingModel} from '../models/voting.model';

@Component({
  selector: 'app-join-panel',
  templateUrl: './join-panel.component.html',
  styleUrls: ['./join-panel.component.scss']
})
export class JoinPanelComponent implements OnInit {

  public form: FormGroup;
  public title = 'Voting Service';
  private id: string;
  public voting: VotingModel;

  constructor(private fBuilder: FormBuilder,
              private votingService: VotingService,
              private titleService: Title,
              private router: Router,
              private actRoute: ActivatedRoute) {
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.form = this.fBuilder.group({
      nickname: ['', [Validators.required, Validators.max(48), Validators.min(3)]],
    });
    this.actRoute.paramMap.subscribe(data => {
        this.id = data.get('id');
      }
    );
    this.votingService.get(this.id).toPromise().then(result => {
      this.voting = result;
    });
  }

  public submit(isObserver: boolean) {
    if (this.form.valid) {
      const model = {
        name: this.nickname.value,
        observer: isObserver
      };
      this.votingService.joinVoting(this.id, model).toPromise().then(() => {
        this.router.navigate(['vote', this.id, model.name]).then(() => {
        });
      });
    }
  }

  get nickname() {
    return this.form.get('nickname');
  }
}
