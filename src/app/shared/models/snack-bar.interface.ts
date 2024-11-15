import { AlertTypeEnum } from '../enums/alert-type.enum';

export interface SnackBarInterface {
  type: AlertTypeEnum;
  text: string;
}
