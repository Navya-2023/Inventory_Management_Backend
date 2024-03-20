import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { UUID } from 'crypto'
import { User } from 'src/entities/user.entity'
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto'
import { UserService } from 'src/modules/user/user.service'
import { UserResponseDto } from './dtos/user-response.dto'
import { config } from 'src/config/messages/config'

/**
 * UserController
 * This controller handles HTTP requests related to user management, which includes:
   - Create a new user.
   - Update a user's details.
   - Delete a particular user.
   - Retrieve user details using username.
   - Retrieve user details using ID.
 */
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * API URL: GET /users/username/:username
   * This function retrieves a user by their username.
   * @param username The username of the user to be retrieved.
   * @returns {Promise<User>} A Promise that resolves with the user object.
   * a. The function takes a parameter 'username', which specifies the username of the user to be retrieved.
   * b. Then it calls the function 'findUserByUsername' to retrieve the user from the database.
   * c. If a user with the username is not found, then it throws a 'NotFoundException' with an error message.
   * d. If a user is found, then it returns the user object.
   */
  @Get(':userName')
  async getUserByUsername(@Param('userName') userName: string): Promise<User> {
    const user = await this.userService.findUserByUsername(userName)
    return user
  }

  /**
   * API URL- POST :/users/create-user
   * The function creates a new user with the provided details
   * @param createUserDto The DTO containing user creation parameters
   * The parameters includes:
   * 1. username : string
   * 2. email : string
   * 3. password :string
   * 4. role : enum
   * @returns {Promise<User>} the new user.
   *
   a. The function takes a createUserDto parameter, which is an instance of the CreateUserDto class containing user creation parameters.
   b. Then it calls createUser to create new user
   c. It returns newly created user*/
  @Post()
  @HttpCode(201)
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(createUserDto)
  }

  /**
   * API URL: PUT /users/edit/:id
   * This function updates an existing user's details.
   * @param id The ID of the user to be edited.
   * @param updateUserDto The DTO containing the updated user details.
   *                      It includes fields such as username, email, password, and roles.
   * @returns {Promise<User>} The updated user object.
   * a. The function takes an 'id' parameter, which specifies the ID of the user to be edited.
   * b. and an 'updateUserDto' parameter, which contains the  user details which is to be updated.
   * c. It first checks if a user with the provided ID exists in the database by calling the 'findUserById'.
   *    If the user is  not found, it throws a 'NotFoundException' with an error message.
   * d. If the user exists, it calls the 'editUser' to update the user's details.
   * e. Then it returns the updated user details.
   */
  @Put(':id')
  async editUser(
    @Param('id') id: UUID,
    @Body() updateUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    const existingUser = await this.userService.findUserById(id)
    if (!existingUser) {
      throw new NotFoundException()
    }
    return await this.userService.editUser(id, updateUserDto)
  }

  /**
   * API URL: DELETE /users/delete/:id
   * This function deletes an existing user.
   * @param id The ID of the user to be deleted.
   * @returns {Promise<void>} A Promise that resolves once the user is successfully deleted.
   * a. The function takes an 'id' parameter, which specifies the ID of the user to be deleted.
   * b. It calls the 'findUserById' to check if a user with the ID exists or not.
   *    If the user is not found, it throws a 'NotFoundException' with an appropriate error message.
   * c. If the user exists, it calls the 'deleteUser' function to delete the user.
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: UUID
  ): Promise<UserResponseDto> {
    const existingUser = await this.userService.findUserById(id)
    if (!existingUser) {
      throw new NotFoundException(config.userNotFound)
    }
    return await this.userService.deleteUser(id)
  }
}

