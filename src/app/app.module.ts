import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from './componentes/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacturasComponent } from './componentes/facturas/facturas.component';

//rutas de los componentes
const rutas: Routes = [
  {path: "", component: CatalogoComponent},
  {path: 'factura', component: FacturasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogoComponent,
    LoaderComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
