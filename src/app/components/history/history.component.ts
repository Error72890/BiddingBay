import { Component } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [SessionGuard]
})
export class HistoryComponent {

}
