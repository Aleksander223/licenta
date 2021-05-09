import { IToken } from './src/models/Token.model';
import { IUser } from './src/models/User.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            token?: Object;
            studentToken?: IToken;
        }
    }

    type Nullable<T> = T | null;
}