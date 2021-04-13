import { IUser } from './src/models/User.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            token?: Object;
        }
    }

    type Nullable<T> = T | null;
}