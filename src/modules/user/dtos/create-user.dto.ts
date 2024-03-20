import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  ArrayNotEmpty,
  IsArray
} from 'class-validator'
import { UUID } from 'crypto'
import { config } from 'src/config/messages/config'
import { Role } from 'src/modules/roles/role.enum'

//The DTO is for creating a new user.
export class CreateUserDto {
  id: UUID;

  @IsNotEmpty({ message: config.usernameNotEmpty })
  @MinLength(5, { message: config.usernameMinLength })
  @IsString()
  userName: string

  @IsNotEmpty({ message: config.emailNotEmpty })
  @IsEmail({}, { message: config.emailFormatInvalid })
  email: string

  @IsNotEmpty({ message: config.passwordNotEmpty })
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: config.passwordComplexity
  })
  password: string

  @IsArray()
  @ArrayNotEmpty({ message: config.rolesNotEmpty })
  userRole: Role[]
}

