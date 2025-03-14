import { CommonModule } from '@angular/common'; // 👈 Asegurar la importación
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule // 👈 ¡IMPORTANTE! Debe estar aquí para que *ngIf y *ngFor funcionen
  ],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: { producto: any, cantidad: number }[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.actualizarCarrito();
  }

  actualizarCarrito() {
    this.carrito = this.carritoService.obtenerCarritoAgrupado();
    this.total = this.carritoService.obtenerTotal();
  }

  eliminarProducto(id: number) {
    this.carritoService.eliminarProducto(id);
    this.actualizarCarrito(); // Refresca la vista
  }

  generarYDescargarXML() {
    const xml = this.carritoService.generarXML();
    console.log("Recibo generado:\n", xml);
    this.descargarXML(xml);
  }

  descargarXML(xml: string) {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  navegarATienda() {
    this.router.navigate(['/']);
  }
}
