import { Role } from "src/modules/roles/role.enum";


export type CreateUserParams={
    
    username: string;
    password: string;
    email:string;
    roles:Role[];
}

