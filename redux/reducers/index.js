import allSettingReducer from "./allSetting.reducers";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from './category.reducers';
import productReducer from './product.reducers';
import searchReducer from './search.reducers';
import localReducer from './local.reducers';
import cartReducer from './cart.reducers';
import {combineReducers} from "redux";
import allSettingReducers from "./allSetting.reducers";

const rootReducer = combineReducers({
    allSetting: allSettingReducer,
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    search: searchReducer,
    local: localReducer,
    cart: cartReducer,
});

export default rootReducer;