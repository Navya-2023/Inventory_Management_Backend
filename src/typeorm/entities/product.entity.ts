import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Import the User entity
/**
 * Attributes:-
 * id: An auto-generated unique identifier for the product.
 * name: The name of the product.
 * description: A brief description of the product.
 * quantity: The quantity of the product.
 * price: The price of the product.
 * createdBy: Many-to-one relationship with the User entity. Each product is associated with the user who created it.
 */
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  createdBy: User;
}
