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

// Attributes of user table
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column('jsonb')
  userRole: Role[];

  @OneToMany(() => Product, (product) => product.createdBy)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() 
  updatedAt: Date;
}

