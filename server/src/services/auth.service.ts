import { User } from "../models/user";
import bcryptjs from 'bcryptjs';

export class AuthService {

    static async createUser(nombre:string, apellido:string, username: string, email: string, password: string, role: string, cuil:string): Promise<User> {
        const user = new User();
        user.role = role;
        user.username = username;
        user.email = email;
        user.password = bcryptjs.hashSync(password, 10);
        user.nombre = nombre;
        user.apellido = apellido;
        user.cuil = cuil;

        console.log(user);
      return user.save();
    }

    async getUsers(): Promise<User[]> {
        return User.findAll();
    }

    async getUserByRole(role: string): Promise<User[]> {
        return User.findAll({ where: { role : role } });
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await User.findByPk(id);
        if (!user) {
          return null;
        }
        return user;
      }        

      async updateUser(id: string, username: string, email: string, password: string, role: string): Promise<User | null> {
        const user = await this.getUserById(id);
        if (!user) {
          return null;
        }
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        return user.save();
      }

      async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) {
          throw new Error(`Usuario no encontrado con ID ${id}`);
        }
        await user.destroy();
      }

      async getUserByUsername(username: string): Promise<User> {
        try {
          const user = await User.findOne({ where: { username } });
          if (!user) {
            throw new Error(`Usuario no encontrado con nombre de usuario ${username}`);
          }
          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message); 
          } else {
            console.error(error);  
          }
          throw error; 
        }
      }

}

