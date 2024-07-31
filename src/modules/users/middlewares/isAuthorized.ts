import AppError from '@shared/errors/appError';
import { Request, Response, NextFunction } from 'express';

export default function isAuthorized(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Acesso negado', 403);
    }
    next();
  };
}
