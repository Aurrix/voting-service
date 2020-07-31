import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {JoinPanelComponent} from './join-panel/join-panel.component';
import {VotePanelComponent} from './vote-panel/vote-panel.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {VotingService} from './services/voting.service';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { StartPanelComponent } from './start-panel/start-panel.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { QuestionModalComponent } from './admin-panel/question-modal/question-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    JoinPanelComponent,
    VotePanelComponent,
    StartPanelComponent,
    QuestionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    ClipboardModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatChipsModule,
    ChartsModule,
    FormsModule
  ],
  providers: [VotingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
