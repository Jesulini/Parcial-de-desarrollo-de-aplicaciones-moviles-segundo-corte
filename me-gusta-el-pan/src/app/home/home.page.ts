import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  panes = [
    {
      name: 'Pan artesanal',
      description: 'Hecho con amor y harina integral.',
      origin: 'Colombia',
      likes: 120,
      image: 'assets/panes/pan1.jpg'
    },
    {
      name: 'Croissant',
      description: 'Crujiente y con aroma francés irresistible.',
      origin: 'Francia',
      likes: 300,
      image: 'assets/panes/pan3.jpg'
    },
    {
      name: 'Pandebono',
      description: 'Clásico colombiano con sabor a hogar.',
      origin: 'Valle del Cauca',
      likes: 250,
      image: 'assets/panes/pan2.jpg'
    }
  ];

  currentPan: {
    name: string;
    description: string;
    origin: string;
    likes: number;
    image: string;
  } | null = this.panes[0];

  currentIndex = 0;

  constructor(private alertController: AlertController) {}

  async likePan() {
    if (this.currentPan) {
      const alert = await this.alertController.create({
        header: '💞 ¡Es un Match!',
        message: `Te gusta ${this.currentPan.name}!<br>¿Quieres abrir el chat?`,
        buttons: [
          {
            text: 'Seguir buscando 🔎',
            role: 'cancel'
          },
          {
            text: 'Ir al chat 💬',
            handler: () => {
              this.launchMatching(this.currentPan!);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  nextPan() {
    this.currentIndex++;
    if (this.currentIndex < this.panes.length) {
      this.currentPan = this.panes[this.currentIndex];
    } else {
      this.currentPan = null;
    }
  }

  resetPanes() {
    this.currentIndex = 0;
    this.currentPan = this.panes[this.currentIndex];
  }

  async launchMatching(pan: any) {
    console.log('🔥 Abriendo MatchingWindow con:', pan.name);
    const alert = await this.alertController.create({
      header: 'Match de Panes 🍞❤️',
      message: `Se ha abierto el chat entre tú y ${pan.name}!`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
