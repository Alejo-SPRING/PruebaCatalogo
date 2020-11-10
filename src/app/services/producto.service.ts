import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  public consultarProductos(): Observable<any>{
    return this.http.get(environment.endPoint + "/mock/productos").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public consultarProductosPorId(id: string): Observable<any>{
    return this.http.get(environment.endPoint + "/mock/productos/" + id).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

}
