import { DataSource } from 'typeorm';
import { databaseConfig } from './typeorm-config';

export const AppDataSource = new DataSource(databaseConfig);
