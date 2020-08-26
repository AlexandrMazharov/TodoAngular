import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TodoListService } from './shared/services/todoList/todo-list.service';
import { environment } from 'src/environments/environment';
// import {TranslateServise} from './shared/services/missingTranslation/missing-translation.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pr2';
  currentLng;
  constructor(
    public authService: AuthService,
    private translateService: TranslateService
  ) {
    this.currentLng = 'en';
    translateService.use[this.currentLng];
  }
  onchangeLng(lng) {
    this.translateService.use(lng.toLowerCase());    
  }
  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}
