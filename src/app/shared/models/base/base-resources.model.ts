export abstract class BaseResourcesModel {
  id?: number;

  static fromJson<T>(
    jsonData: Record<string, T[Extract<keyof T, string>]>,
    classe: new () => T
  ): T {
    const instancia = new classe();

    for (const prop in instancia) {
      if (Object.prototype.hasOwnProperty.call(jsonData, prop)) {
        instancia[prop] = jsonData[prop];
      } else {
        const err = `Objeto com propriedade(s) inválida(s) ou faltante(s): ${Object.keys(
          jsonData
        )}`;
        console.log(err, jsonData);
        throw new Error(err);
      }
    }

    return instancia;
  }
}
