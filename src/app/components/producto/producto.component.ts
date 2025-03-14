import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html', 
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor( 
    private productoService: ProductoService,
    private carritoService: CarritoService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

  irAlCarrito(){
    this.router.navigate(['/carrito']);
  }
}
