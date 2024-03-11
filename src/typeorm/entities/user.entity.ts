import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';
import { Role } from 'src/modules/roles/role.enum';
/**
 * id: An auto-generated unique identifier for the user.
 * username: The username of the user.
 * email: The email address of the user.
 * password: The password of the user.
 * roles: An array of strings representing the roles assigned to the user.
 * products: One-to-many relationship with the Product entity. Each user can create multiple products
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('jsonb')
  roles: string[];

  @OneToMany(() => Product, (product) => product.createdBy)
  products: Product[];
}
