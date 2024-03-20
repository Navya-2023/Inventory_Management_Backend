import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { encodePassword } from 'src/utils/bcrypt.utils'
import { User } from 'src/entities/user.entity'
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto'
import { UserResponseDto } from './dtos/user-response.dto'
import { config } from 'src/config/messages/config'

/**
 * UserService
 * This service class  handles operations related to user management, which includes:
   - Create a new user.
   - Update a user's details.
   - Delete a particular user.
   - Retrieve user details using username.
   - Retrieve user details using ID.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  /**
   * createUser - Creates a new user with the provided details.
   * @param userDetails The DTO containing user creation parameters.
   * @returns {Promise<User>} A Promise that resolves with the newly created user object.
   * a. The method takes a 'userDetails' parameter, which is an instance of the CreateUserDto containing user creation parameters.
   * b. It checks whether the user already exist or not.
   * c. If a user with the same username already exists, the method throws a BadRequestException with an error message.
   * d. Else the method creates a new user with the userDetails.
   * e. The method returns the new user.
   */
  async createUser(userDetails: CreateUserDto): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email:userDetails.email } });
      console.log(existingUser,"hiiiiii")
      //const existingUser = await this.userRepository.find({where:{userDetails.email}})
      if (existingUser) {    
        throw new ConflictException(config.userAlreadyExists)
      }
      userDetails.email = userDetails.email.toLowerCase()
      const password = encodePassword(userDetails.password)
      const newUser = this.userRepository.create({ ...userDetails, password })
      console.log(newUser)
      await this.userRepository.save(newUser)
      return new UserResponseDto(true, config.userCreatedSuccessfully, [])
    } catch (error) {
      throw new UserResponseDto(false, config.userFailedToCreate, [error])
    }
  }

  /**
   * editUser - Updates an existing user's details based on the provided ID.
   * @param id The ID of the user to be edited.
   * @param updateUserDto The DTO containing the user details.
   * @returns {Promise<User>} A Promise that resolves with the updated user object.
   * a. The method takes an 'id' parameter, which specifies the ID of the user to be edited.
   * b. It also receives an 'updateUserDto' parameter, which contains the user details.
   * c. It queries to find the user with the provided ID, if a user is not found, the method throws a 'NotFoundException' with an error message.
   * d. If a user is found, the method updates the user's details from the 'updateUserDto' using Object.assign().
   * e. It then saves the updated user object to the database using the 'save' method.
   * f. The function returns the updated user.
   */
  async editUser(
    id: string,
    updateUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        throw new NotFoundException(config.userNotFound)
      }
      const updatedUser = Object.assign(user, updateUserDto)
      await this.userRepository.save(updatedUser)
      return new UserResponseDto(
        true,
        config.userUpdatedSuccessfully,
        []
      )
    } catch (error) {
      return new UserResponseDto(false, config.userFailedToUpdate, [
        error.message
      ])
    }
  }

  /**
   * deleteUser - Deletes a user based on the provided ID.
   * @param id The ID of the user to be deleted.
   * @returns {Promise<void>} A Promise that resolves once the user is successfully deleted.
   * a. The method takes an 'id' parameter, which specifies the ID of the user to be deleted.
   * b. It queries to find the user with the provided ID, if a user is not found, the method throws a 'NotFoundException' with an error message.
   * c. If a user is found, the method removes the user from the database using the 'remove' method.
   * d. The method returns a Promise that resolves once the user is successfully deleted.
   */
  async deleteUser(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        throw new NotFoundException(config.userNotFound)
      }
      await this.userRepository.remove(user)
      return new UserResponseDto(true, config.userDeletedSuccessfully)
    } catch (error) {
      throw new UserResponseDto(false, config.userFailedToDelete, [
        error.message
      ])
    }
  }

  /**
   * The function retrieves a user from the database based on their email.
   * @param userName The email of the user to be retrieved.
   * a. The method takes a 'email' parameter, which specifies the email of the user to be retrieved.
   * b. It queries  to find a user with the provided email.
   * c. If a user with the given email is found, the method returns a Promise that resolves with the user object.
   * d. If a user with the email is not found the method will return an error message.
   */
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(config.userNotFound)
    }
    return user
  }

  /**
   * The function retrieves a user from the database based on their username.
   * @param userName The username of the user to be retrieved.
   * a. The method takes a 'username' parameter, which specifies the username of the user to be retrieved.
   * b. It queries  to find a user with the provided username.
   * c. If a user with the given username is found, the method returns a Promise that resolves with the user object.
   * d. If a user with the username is not found the method will return an error message.
   */
  async findUserByUsername(userName: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { userName } })
    } catch (error) {
      return error
    }
  }

  /**
   * Retrieves a user from the database based on their ID.
   * @param id The ID of the user to be retrieved.
   * a. The method takes an 'id' parameter, which specifies the ID of the user to be retrieved.
   * b. It queries the database to find a user with the provided ID.
   * c. If a user with the given ID is found, the method returns a Promise that resolves with the user object.
   * d. If a user with the ID is not found, the method throws a NotFoundException.
   */
  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        throw new NotFoundException(config.userNotFound)
      }
      return user
    } catch (error) {
      return error
    }
  }
}

