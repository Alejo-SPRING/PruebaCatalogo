import { Component, OnInit } from '@angular/core';
import { Facturasdb } from '../../services/facturasdb';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  private facturasdb: Facturasdb = new Facturasdb();
  public facturas: any[];
  public codigo: string;

  constructor() { }

  ngOnInit(): void {
    LoaderComponent.status = true;
    this.facturas = this.facturasdb.consultarFacturas();
    LoaderComponent.status = false;
  }

  public buscarChange(): void {
    LoaderComponent.status = true;
    if (this.codigo != null && this.codigo != "") {
      this.facturas = [];
      let producto: any = this.facturasdb.consultarPorId(this.codigo);
      if(producto != null) {
        this.facturas.push(producto);
      }
    } else {
      this.ngOnInit();
    }
    LoaderComponent.status = false;
  }

}
