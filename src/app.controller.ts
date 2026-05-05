import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDb() {
    try {
      const users = await this.userService.findAll();
      return {
        success: true,
        message: 'Database connection successful',
        userCount: users.length,
        users: users.map(u => ({
          id: u.id,
          email: u.email,
          role: u.role,
          hasPassword: !!u.password
        }))
      };
    } catch (error) {
      return {
        success: false,
        message: 'Database connection failed',
        error: error.message
      };
    }
  }
}
