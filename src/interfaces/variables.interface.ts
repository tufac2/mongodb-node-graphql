import { IPaginationOptions } from './pagination-options.interface';
import { IUser } from './user.interfaces';
export interface IVariables {
    id?: string | number;
    category?: string;
    user?: IUser;
    pagination?: IPaginationOptions;
}