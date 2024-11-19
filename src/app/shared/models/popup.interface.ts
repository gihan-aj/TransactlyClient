import { PopupTypeEnum } from '../enums/popup-type.enum';

export interface PopupInterface<T> {
  title: string;
  popupType: PopupTypeEnum;
  data: T | undefined;
}
