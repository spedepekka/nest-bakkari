import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Jorma Perälä",
            "email": "jomppe@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Atte Kokkonen",
            "email": "atte@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Usko Eevertti",
            "email": "sakasti@usko.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "Meikä Mies",
            "email": "maolenengineer@ukko.fi",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Herra Admin",
            "email": "admin@gmail.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User role not found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestID[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
