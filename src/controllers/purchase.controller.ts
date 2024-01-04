import { NextFunction, Request, Response } from "express";
import { Purchase } from "../entities/purchase.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class PurchaseController extends GlobalController {

  private purchaseService = new Service(Purchase)

  async getPurchaseByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.getManyBySearchOptions(searchOptions, [
        "project"
      ]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.delete(+req.params.id);
    });
  }
}