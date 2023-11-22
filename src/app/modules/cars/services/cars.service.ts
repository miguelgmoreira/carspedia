import { Injectable, Injector } from '@angular/core';
import { BaseResourcesService } from 'src/app/shared/services/base-resources.service';
import { Carro } from '../model/carro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarsService extends BaseResourcesService<Carro> {
  constructor(protected override injector: Injector) {
    super(injector, environment.url + '/carros', Carro.fromJson, Carro);
  }
}
