import ProductDaoMongoDB from './mongodb/product.dao.js'; 
import ProductDaoFS from './filesystem/product.dao.js';
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import UserDaoMongoDB from "./mongodb/user.dao.js";
import { initMongoDB } from '../db/connection.js';
import config from '../../envConfig.js';

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = config.PERSISTENCE;

switch (persistence) {
    case 'fs':
        console.log(persistence);
        prodDao = new ProductDaoFS('./src/data/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
    case 'mongo':
        console.log(persistence)
        initMongoDB();
        userDao = new UserDaoMongoDB();
        prodDao = new ProductDaoMongoDB();
        cartDao = new CartDaoMongoDB();
        break;
    // case 'sql':
    //     userDao = new UserDaoSql();
    //     prodDao = new ProductDaoSql();
    //     cartDao = new CartDaoSqlDB();
    default:
        prodDao = new ProductDaoFS('./src/data/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
    break;
}

export default { userDao, prodDao, cartDao };