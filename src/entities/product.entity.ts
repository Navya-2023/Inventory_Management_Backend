import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
/**
 * Attributes:-
 * id: An auto-generated unique identifier for the product.
 * productTitle: The name of the product.
 * description: A brief description of the product.
 * quantity: The quantity of the product.
 * price: The price of the product.
 * createdBy: Many-to-one relationship with the User entity. Each product is associated with the user who created it.
 * createdAt: The date at which the user is created.
 * updatedAt: The date at which the user is updated.
 */
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_title' })
  productTitle: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
