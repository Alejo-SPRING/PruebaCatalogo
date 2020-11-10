import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { LoaderComponent } from '../loader/loader.component';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Facturasdb } from '../../services/facturasdb';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  public productos: any[] = [];
  public ruta: string;
  public id: string;
  private facturasDb: Facturasdb = new Facturasdb();
  public factura: {
    nombre: string,
    fechaNacimiento: string,
    direccion: string,
    cedula: File,
    codigo: string,
    ciudad: string,
    producto: any,
    cantidad: number
  };
  public producto: any;
  public cantidadP: number;

  constructor(private productoService: ProductoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    LoaderComponent.status = true;
    this.productoService.consultarProductos().subscribe(
      response => {
        this.productos = response;
        LoaderComponent.status = false;
      },
      error => {
        swal.fire("¡Upps!", "Ha ocurrido un error, intentalo de nuevo!", "error");
        LoaderComponent.status = false;
      }
    );
    this.factura = {
      nombre: "",
      fechaNacimiento: "",
      direccion: "",
      cedula: null,
      codigo: "",
      ciudad: "",
      producto: null,
      cantidad: 0
    };
  }

  public crearFactura(): void {
    LoaderComponent.status = true;
    if (this.producto.cantidadDisponible >= this.cantidadP && this.cantidadP > 0) {
      this.factura.codigo = uuidv4()
      this.factura.producto = this.producto;
      this.factura.cantidad = this.cantidadP;
      this.facturasDb.crearFactura(this.factura);
      this.ngOnInit();
      this.cantidadP = 0;
      swal.fire("¡Factura creada!", "", "success");
    } else {
      swal.fire("¡No tenemos existencias!", "", "error");
      LoaderComponent.status = false;
    }
  }

  public buscadorChange(): void {
    if (this.id == null || this.id == "") {
      this.ngOnInit();
    } else {
      LoaderComponent.status = true;
      this.productoService.consultarProductosPorId(this.id).subscribe(
        response => {
          if (response.responseCode == 404) {
            swal.fire("¡Error!", response.body, "info");
          } else {
            this.productos = [];
            this.productos.push(response);
          }
          LoaderComponent.status = false;
        },
        error => {
          swal.fire("¡Upps!", "Ha ocurrido un error, intentalo de nuevo!", "error");
          LoaderComponent.status = false;
        }
      );
    }
  }

  public open(content: any, obj: any, tamano: string): void {
    if (typeof obj == 'string') {
      this.ruta = obj;
    } else {
      this.producto = obj;
    }
    this.modalService.open(content, { size: tamano });
  }

}
