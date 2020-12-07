import { findOneElmenet, insertOneElement } from './../../lib/db-operations';
import { COLLECTIONS, MESSAGES } from './../../config/constants';
import { IResolvers } from "graphql-tools";
import bcrypt from 'bcrypt';
import { assignDocumentId } from '../../lib/db-operations';
import UserService from '../../services/user.service';

const resolversUserMutation: IResolvers = {
    Mutation:{
        async register(_, { user }, context) {
            return new UserService(_, { user }, context).register();
        },

        async updateUser (_, { user }, context){
            return new UserService(_, { user }, context).modify();
        }
    }

};

export default resolversUserMutation;