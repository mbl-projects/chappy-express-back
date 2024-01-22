import { Request, Response, NextFunction } from "express";
import { redis } from "..";

export const fetchDataFromRedis = async (req: Request, res: Response, next: NextFunction) => {
  const result = await redis.get(req.url);
  if (result && result !== null) {
    res.status(200).json({data: JSON.parse(result), message: "data from cache"})
  } else {
    next()
  }
};