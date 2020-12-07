import { IResolvers } from 'graphql-tools';
import PlatformService from '../../services/platform.service';
import ProductService from '../../services/product.service';

// We do this because good Apollo Practises we need to use ProducID and in database we have product-id
const resolversPlatformType: IResolvers = {
    Platform: {
        active: (parent) => (parent.active !== false) ? true : false
    }
};

export default resolversPlatformType;