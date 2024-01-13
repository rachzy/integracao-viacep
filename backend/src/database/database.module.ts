import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: configService.get('MONGO_PORT'),
        username: configService.get('MONGO_USER'),
        password: configService.get('MONGO_PASSWORD'),
        database: configService.get('MONGO_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('MONGO_SYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
