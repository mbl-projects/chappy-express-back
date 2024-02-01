import { EntityTarget, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.handler.middleware";

export class Service {

  private repository:Repository<any>;
  // Dans chaque controlleur, on instancie un service avec comme paramètre
  // une entity
  // Cela permet d'utiliser un global "repository" dans les fonctions
  constructor(entity:EntityTarget<any>){
    this.repository = AppDataSource.getRepository(entity);
  }

  // Function global du service qui gère la logique du try/catch er des erreurs
  private async handleService<T>(name: string, callback: () => Promise<T>): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      // gestion des erreurs, renvoie une 500 car innatendu dans le service
      // ainsi qu'un tag "SER" puis le nom de la fonction en parametre
      // de chaque autres fonctions
      throw new CustomError(`SER-${name}`, 500, error.message);
    }
  }

  // chaque fonction appelle via callback la fonction globale
  async getAll<T>(relations?: Array<string>): Promise<T> {
    return this.handleService<T>("GET-ALL", async () => {
      return this.repository.find({ relations }) as Promise<T>
    });
  }

  // Certain paramètres de la fonction sont facultatifs ce qui permet 
  // de réutiliser la même fonction pour plusieurs besoins
  async getOneById<T>(id: number, relations?: Array<string>, select?:any): Promise<T> {
    return this.handleService("GET-ONEBYID", async () => {
      return this.repository.findOne({ where:{id}, relations, select }) as Promise<T>
    });
  }

  async getOneBySearchOptions<T>(searchOptions: {}, relations?: Array<string>, select?:any): Promise<T> {
    return this.handleService("GET-ONE-SEARCH", async () => {
      return this.repository.findOne({ where: searchOptions, relations, select }) as Promise<T>
    });
  }

  async getManyBySearchOptions<T>(searchOptions: {}, relations?: Array<string>, select?:any): Promise<T> {
    return this.handleService<T>("GET-MANY", async () => {
      return this.repository.find({ where: searchOptions, relations, select}) as Promise<T>
    });
  }

  async create<T>(body: {}): Promise<T> {
    return this.handleService("CREATE", async () => {
      return this.repository.save(body) as Promise<T>
    });
  }

  async delete<T>(id: number): Promise<T> {
    return this.handleService("DELETE", async () => {
      return this.repository.delete(id) as Promise<T>
    });
  }

  async update(id: number, body: {}, relations?: Array<string>, select?:any): Promise<any> {
    return this.handleService("UPDATE", async () => {
      const entityToUpdate = await this.repository.findOne({ where: { id } , relations, select});
      return this.repository.save(this.repository.merge(entityToUpdate, body))
    });
  }

  async exist(searchOptions: {}, relations?: Array<string>, select?:any): Promise<boolean> {
    return this.handleService("IF-EXIST", async () => {
      return this.repository.exist({ where: searchOptions, relations, select });
    });
  }
}
