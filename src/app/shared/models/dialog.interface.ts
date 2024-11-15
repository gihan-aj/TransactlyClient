import { AlertTypeEnum } from '../enums/alert-type.enum';

export interface DialogInterface {
  type: AlertTypeEnum;
  title: string;
  text: string;
  action: string;
}
