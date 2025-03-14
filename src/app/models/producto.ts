export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number; // Stock disponible en inventario
    imagen: string;
  }
  
  // Para el carrito, extendemos Producto añadiendo la cantidad agregada al carrito
  export interface ProductoCarrito extends Producto {
    cantidadCarrito: number;
  }
  