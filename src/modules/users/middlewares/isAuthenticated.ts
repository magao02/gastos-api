import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/appError';
import auth from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Faltando o token JWT', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);
    const { sub, role } = decoded as TokenPayload;
    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch {
    throw new AppError('Token JWT invalido', 401);
  }
}
