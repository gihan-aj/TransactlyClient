import { AlertTypeEnum } from '../enums/alert-type.enum';

export interface AlertInterface {
  type: AlertTypeEnum;
  text: string;
}
