import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  // Modelo para crear un producto nuevo (sin id)
  productoModelo: Omit<Producto, 'id'> = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    imagen: ''
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }

  crearProducto() {
    this.productoService.crearProducto(this.productoModelo as Producto)
      .subscribe(() => {
        this.cargarProductos();
        this.productoModelo = { nombre: '', precio: 0, cantidad: 0, imagen: '' };
      });
  }

  modificarProducto(producto: Producto) {
    this.productoService.modificarProducto(producto)
      .subscribe(() => {
        this.cargarProductos();
      });
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id)
      .subscribe(() => {
        this.cargarProductos();
      });
  }
}
