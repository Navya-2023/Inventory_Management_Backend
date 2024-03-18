import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { UUID } from 'crypto';
import { Role } from 'src/modules/roles/role.enum';
import { userValidationMessages } from '../validations/user-validation-messages';

/**
 *  The DTO is for creating a new user.
 *
 * a. id: number (optional) - The unique identifier of the user.
 * b. username: string - The username of the user.
 *    Validation: Must not be empty and must be at least 5 characters long.
 * c. email: string - The email address of the user.
 *    Validation: Must not be empty and must be a valid email format.
 * d. password: string - The password of the user.
 *    Validation: Must not be empty and must meet certain complexity requirements.
 *    Must contain at least one number, one letter, one special character, and be at least 8 characters long.
 */

export class CreateUserDto {
  id: UUID;

  @IsNotEmpty({ message: userValidationMessages.usernameNotEmpty })
  @MinLength(5, { message: userValidationMessages.usernameMinLength })
  @IsString()
  userName: string;

  @IsNotEmpty({ message: userValidationMessages.emailNotEmpty })
  @IsEmail({}, { message: userValidationMessages.emailFormatInvalid })
  email: string;

  @IsNotEmpty({ message: userValidationMessages.passwordNotEmpty })
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: userValidationMessages.passwordComplexity,
  })
  password: string;

  @IsArray()
  @ArrayNotEmpty({ message: userValidationMessages.rolesNotEmpty })
  userRole: Role[];
}
