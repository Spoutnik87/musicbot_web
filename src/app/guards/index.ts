import { AdminGuard } from './admin.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { NotAuthenticatedGuard } from './notauthenticated.guard';
import { UserGuard } from './user.guard';

export const guards: any[] = [AuthenticatedGuard, NotAuthenticatedGuard, AdminGuard, UserGuard];

export * from './authenticated.guard';
export * from './notauthenticated.guard';
export * from './admin.guard';
export * from './user.guard';
