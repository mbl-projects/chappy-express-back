import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/comment.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";

export class CommentController extends GlobalController {

  private commentService = new Service(Comment)

}