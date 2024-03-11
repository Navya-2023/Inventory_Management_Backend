import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/modules/roles/role.enum';

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
  id: number;

  @IsNotEmpty({ message: 'The username cannot be empty' })
  @MinLength(5, { message: 'The username must be at least 5 characters long' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'The email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'The password cannot be empty' })
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'Password must contain at least one number, one letter, one special character, and be at least 8 characters long',
  })
  password: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'The role cannot be empty' })
  roles: Role[];
}
