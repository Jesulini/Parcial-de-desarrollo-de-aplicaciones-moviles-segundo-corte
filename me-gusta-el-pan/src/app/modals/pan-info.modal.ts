import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pan-info-modal',
  standalone: true,
  templateUrl: './pan-info.modal.html',
  styleUrls: ['./pan-info.modal.scss'],
  imports: [IonicModule, CommonModule],
})
export class PanInfoModal {
  @Input() pan: any; // recibe el pan seleccionado

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
