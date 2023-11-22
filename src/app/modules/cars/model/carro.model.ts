import { BaseResourcesModel } from 'src/app/shared/models/base/base-resources.model';

export class Carro extends BaseResourcesModel {
  constructor(
    public override id?: number,
    public tipo?: string,
    public fabricante?: string,
    public modelo?: string,
    public ano?: number,
    public preco?: number,
    public especificacoesTecnicas?: {
      motor?: string;
      potencia?: string;
      consumo?: string;
    }
  ) {
    super();
  }
}
