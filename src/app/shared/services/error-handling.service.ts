import { inject, Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertTypeEnum } from '../enums/alert-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private alertService = inject(AlertService);

  private alertTypes = AlertTypeEnum;

  handle(error: any): void {
    if (error.error.title) {
      this.alertService.alert(
        this.alertTypes.danger,
        error.error.title,
        error.error.detail
      );
    } else {
      this.alertService.alert(
        this.alertTypes.danger,
        'Unknown Error',
        'Unidentified error occured'
      );
    }
  }
}