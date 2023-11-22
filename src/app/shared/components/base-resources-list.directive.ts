import { Directive, OnDestroy } from '@angular/core';

import { BaseResourcesModel } from '../models/base/base-resources.model';
import { BaseResourcesService } from '../services/base-resources.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appBaseResourcesList]', // O seletor pode ser qualquer nome entre colchetes []
})
export abstract class BaseResourcesListComponent<T extends BaseResourcesModel>
  implements OnDestroy
{
  resources: T[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private baseResourcesService: BaseResourcesService<T>) {}

  getAllResources() {
    this.baseResourcesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resources) => {
          (this.resources = resources.sort(
            (a, b) => (a.id ?? 0) - (b.id ?? 0)
          )),
            console.log('Dados recuperados com sucesso');
        },
        error: (error) => {
          console.log('Ocorreu error no loadResource.', error);
        },
      });
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir o item');
    if (mustDelete) {
      const resourceId = typeof resource.id === 'number' ? resource.id : 0; // Valor padrão 0 para resourceId se resource.id for undefined

      this.baseResourcesService
        .delete(resourceId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: unknown) => {
            console.log('Registro removido com sucesso', response);
            this.resources = [];
            this.getAllResources();
          },
          error: () => alert('Erro ao tentar excluir'),
        });
    }
  }

  patchResource(resource: T) {
    this.baseResourcesService
      .patch(resource)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: unknown) => {
          console.log('Registro atualizado com sucesso', response);
          this.resources = [];
          this.getAllResources();
        },
        error: () => alert('Erro ao tentar alterar'),
      });
  }

  getWithQueryParams(queryParams: string) {
    this.baseResourcesService
      .getWithQueryParams(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resources) => {
          (this.resources = resources.sort(
            (a, b) => (a.id ?? 0) - (b.id ?? 0)
          )),
            console.log('Dados recuperados com sucesso', resources);
        },
        error: (error) => {
          console.log('Ocorreu error no loadResource.', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
