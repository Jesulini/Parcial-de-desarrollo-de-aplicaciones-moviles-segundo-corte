import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController, GestureController, Gesture, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PanInfoModal } from '../modals/pan-info.modal';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit, AfterViewInit {
  panes: any[] = [];
  passions: string[] = [
    'Videojuegos', 'Viajes', 'Harry Potter', 'Deportes', 'Cine', 'Música', 'Libros',
    'Comida', 'Tecnología', 'Arte', 'Fotografía', 'Animales', 'Naturaleza', 'Fitness',
    'Series', 'Moda', 'Cultura', 'Baile', 'Idiomas', 'Meditación'
  ];

  @ViewChildren('panCard', { read: ElementRef }) panCards!: QueryList<ElementRef>;

  constructor(
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.generatePanes();
  }

  ngAfterViewInit() {
    this.setupGestures();
  }

  setupGestures() {
    this.panCards.changes.subscribe(() => this.applyGestures());
    this.applyGestures();
  }

  applyGestures() {
    this.panCards.forEach((cardEl: ElementRef, index: number) => {
      const gesture: Gesture = this.gestureCtrl.create({
        el: cardEl.nativeElement,
        gestureName: 'swipe-pan',
        onMove: ev => this.onMove(ev, cardEl),
        onEnd: ev => this.onEnd(ev, cardEl, index),
      });
      gesture.enable(true);
    });
  }

  generatePanes() {
    const nombres = ['Baguette', 'Croissant', 'Pan de Ajo', 'Pan Integral', 'Pan de Maíz', 'Pan de Queso', 'Pan Rústico', 'Pan Dulce', 'Ciabatta', 'Focaccia'];
    const apellidos = ['Delicioso', 'Crujiente', 'Aromático', 'Sabroso', 'Suave', 'Dorado', 'Tierno', 'Exquisito', 'Esponjoso', 'Clásico'];
    const paises = ['Colombia', 'México', 'Argentina', 'España', 'Chile'];
    const ciudades = ['Cartagena', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla'];
    const generos = ['masculino', 'femenino', 'neutro'];

    this.panes = Array.from({ length: 10 }).map((_, i) => ({
      uid: `pan-${Date.now()}-${i}`, // id único cada vez
      name: nombres[Math.floor(Math.random() * nombres.length)],
      lastName: apellidos[Math.floor(Math.random() * apellidos.length)],
      birthDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      email: `user${Math.floor(Math.random() * 10000)}@pan.com`,
      country: paises[Math.floor(Math.random() * paises.length)],
      city: ciudades[Math.floor(Math.random() * ciudades.length)],
      gender: generos[Math.floor(Math.random() * generos.length)],
      image: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`,
      passions: this.getRandomPassions()
    }));
  }

  getRandomPassions(): string[] {
    const shuffled = [...this.passions].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 4) + 2; // entre 2 y 5 pasiones
    return shuffled.slice(0, count);
  }

  async openPanInfo(pan: any) {
    const modal = await this.modalCtrl.create({
      component: PanInfoModal,
      componentProps: { pan },
    });
    await modal.present();
  }

  onMove(ev: any, cardEl: ElementRef) {
    cardEl.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
  }

  onEnd(ev: any, cardEl: ElementRef, index: number) {
    const threshold = 150;
    if (Math.abs(ev.deltaX) > threshold) {
      const direction = ev.deltaX > 0 ? 1 : -1;
      this.swipeCard(cardEl, index, direction);
    } else {
      cardEl.nativeElement.style.transition = '0.3s ease-out';
      cardEl.nativeElement.style.transform = 'translateX(0px) rotate(0deg)';
    }
  }

  swipeCard(cardEl: ElementRef, index: number, direction: number) {
    cardEl.nativeElement.style.transition = '0.3s ease-out';
    cardEl.nativeElement.style.transform = `translateX(${direction * 1000}px) rotate(${direction * 45}deg)`;
    setTimeout(() => this.panes.splice(index, 1), 300);
  }

  // 🔄 Generar 10 perfiles nuevos
  retryPanes() {
    this.generatePanes();
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  logout() {
    localStorage.removeItem('user');
    this.navCtrl.navigateRoot('/login');
  }
}
