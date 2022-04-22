
/**
 * 用户数据信息存储相关类
 */

export class UserData {
    static UserBaseInfo: Map<string, any> = new Map();

    /**查找用户信息 */
    static GetUserBase(key) {
        return this.UserBaseInfo.get(key);
    }
    /**设置用户信息 */
    static SetUserBase(key, value) {
        return this.UserBaseInfo.set(key, value);
    }

}

export { UserData as user };