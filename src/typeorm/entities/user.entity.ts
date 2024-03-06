import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity'; 
import { Role } from 'src/modules/roles/role.enum';

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
  // @Column('simple-array')
  // role: string;
  

  @OneToMany(() => Product, product => product.createdBy) 
  products: Product[]; 
}
