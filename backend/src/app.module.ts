import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sigafdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
      logging: false,
    }), UsersModule



  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
