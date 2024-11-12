import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year: WritableSignal<number> = signal(0);

  constructor() {
    this.year.set(new Date().getFullYear());
  }
}
