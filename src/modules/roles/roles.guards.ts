import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from './role.enum'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // The canActivate function determines whether the request should be activated based on the user's role.
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    //If no role is required
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    // Check if the user is an admin or an employee
    const isAdmin = user.role?.includes(Role.Admin)
    //const isEmployee = user.role?.includes(Role.Employee);

    return isAdmin 
  }
}

