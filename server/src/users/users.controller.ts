import { Request, Response, NextFunction } from 'express'
import { usersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from './user.interface'
import { UserRoles } from '../enums/user-roles.enum'

class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersService.getAll()
      const filtered = users.filter(user => user.role.role !== UserRoles.System)
      return res.json({ users: filtered })
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const user = await usersService.getById(id)
      return res.json({ user })
    } catch(e) {
      next(e)
    }
  }

  async create(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
    try {
      const { name, realName, password, roleId } = req.body
      if (!name || !realName || !password || !roleId) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new CreateUserDto(req.body)
      const user = await usersService.create(dto)
      return res.json({ message: 'Пользователь успешно добавлен', user })
    } catch(e) {
      next(e)
    }
  }

  async changePassword(req: AuthRequest<{}, {}, ChangePasswordDto>, res: Response, next: NextFunction) {
    try {
      const { old, repeat } = req.body
      if(!req.body.new || !old || !repeat) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const userId = (req.user as User).id
      const dto = new ChangePasswordDto(req.body)

      await usersService.changePassword(userId, dto)
      return res.json({ message: 'Пароль успешно изменен' })
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateUserDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateUserDto(req.body)
      const user = await usersService.update(id, dto)
      return res.json({ message: 'Пользователь успешно изменен', user })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await usersService.remove(id)
      return res.json({ message: 'Пользователь успешно удален' })
    } catch(e) {
      next(e)
    }
  }
}

export const usersController = new UsersController()