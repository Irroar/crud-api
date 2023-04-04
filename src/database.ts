import { User } from './models/userModel';

export class DataBase {
    users: User[] = [];
    
    async getAll() {
        return this.users;
    }

    async getById(id: string) {
        return this.users.find((p) => p.id === id);
    }

    async add(product: User) {
        return this.users.push(product);
    }

    async update(id: string, product) {
        const index = this.users.findIndex((p) => p.id === id);
        return this.users[index] = {id, ...product};
    }

    async delete(id: string) {
        return this.users = this.users.filter((p) => p.id != id); 
    }
} 