import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../services/voting.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NewVotingModel} from '../models/new.voting.model';

@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.component.html',
  styleUrls: ['./start-panel.component.scss']
})
export class StartPanelComponent implements OnInit {
  public form: FormGroup;
  public title = 'Voting Service';
  public hide = true;

  constructor(private fBuilder: FormBuilder, private votingService: VotingService, private titleService: Title, private router: Router) {
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.form = this.fBuilder.group({
      name: ['', [Validators.required, Validators.max(48), Validators.min(3)]],
      key: ['', [Validators.required, Validators.min(8)]],
      description: ['']
    });
  }

  public submit() {
    if (this.form.valid) {
      const model: NewVotingModel = {
        name: this.name.value,
        key: this.key.value,
        description: this.description.value
      };
      this.votingService.submitNew(model).toPromise().then(result => {
        let id: string;
        const headerLocation = result.headers.get('Location');
        const slashIndex = headerLocation.lastIndexOf('/');
        id = headerLocation.substring(slashIndex + 1, headerLocation.length);
        this.router.navigate(['admin', id]).then(() => {
        });
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  get key() {
    return this.form.get('key');
  }

  get description() {
    return this.form.get('description');
  }

}
