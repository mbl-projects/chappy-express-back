import { NextFunction, Response, Request } from "express";
import { Task } from "../entities/task.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";

export class TaskController extends GlobalController {

  private taskService = new Service(Task)

  async getTasksByIdStep(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { step: {id:+req.params.idStep} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "step",
        "category",
        "users"
      ]);
    });
  }

  async getTasksByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "project",
        "category",
        "users"
      ]);
    });
  }

  async getOwnerTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: {id: +req.params.idUser} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "owner"
      ]);
    });
  }

  async getCollabTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: {id: +req.params.idUser} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "users"
      ]);
    });
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getOneById(+req.params.id, ["category", "owner", "users"]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.delete(+req.params.id);
    });
  }
}