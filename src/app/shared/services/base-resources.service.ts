import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResourcesModel } from '../models/base/base-resources.model';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseResourcesService<T extends BaseResourcesModel> {
  private http: HttpClient;

  constructor(
    protected injector: Injector,
    protected apiPath: string,
    protected jsonDataToResourceFn: <T>(
      jsonData: Record<string, any>,
      className: new () => T
    ) => T,
    private classe: { new (): T }
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map((data: any) => this.jsonDataToResources(data)),
      catchError(this.handlerError)
    );
  }

  update(resource: T): Observable<T> {
    return this.http.put(`${this.apiPath}/${resource.id}`, resource).pipe(
      map(() => resource),
      catchError(this.handlerError)
    );
  }

  patch(resource: T): Observable<T> {
    return this.http.patch(`${this.apiPath}/${resource.id}`, resource).pipe(
      map(() => resource),
      catchError(this.handlerError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete<T>(url).pipe(
      map(() => null),
      catchError(this.handlerError)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handlerError)
      );
  }

  create(resource: T): Observable<T> {
    return this.http
      .post(this.apiPath, resource)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handlerError)
      );
  }

  getWithQueryParams(queryParams: string): Observable<T[]> {
    return this.http.get(`${this.apiPath}?${queryParams}`).pipe(
      map((data: any) => this.jsonDataToResources(data)),
      catchError(this.handlerError)
    );
  }

  //PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    // para cada item do array que volta da api é criada uma instância do tipo T
    const resources: T[] = [];

    jsonData.forEach((element) =>
      resources.push(this.jsonDataToResourceFn<T>(element, this.classe))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData, this.classe); // em caso de requisições que retornam apenas um item
  }

  protected handlerError(error: any): Observable<any> {
    return throwError(() => error);
  }
}
