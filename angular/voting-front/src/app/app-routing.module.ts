import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {JoinPanelComponent} from './join-panel/join-panel.component';
import {VotePanelComponent} from './vote-panel/vote-panel.component';
import {StartPanelComponent} from './start-panel/start-panel.component';


const routes: Routes = [
  {path: '', component: StartPanelComponent},
  {path: 'admin/:id', component: AdminPanelComponent},
  {path: 'join/:id', component: JoinPanelComponent},
  {path: 'vote/:id/:participant', component: VotePanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
