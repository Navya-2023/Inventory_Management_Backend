import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
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
 * createdAt: The date at which the product is created.
 * updatedAt: The date at which the product is updated.
 */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'user_name'})
  userName: string;

  @Column({name:'e_mail',unique: true})
  email: string;

  @Column()
  password: string;

  @Column('jsonb',{name:'user_role'})
  userRole: Role[];

  @OneToMany(() => Product, (product) => product.createdBy)
  products: Product[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) 
  updatedAt: Date;
}
