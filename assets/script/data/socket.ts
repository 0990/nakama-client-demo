
/**
 * 用户数据信息存储相关类
 */

 import { default as nakama } from "@heroiclabs/nakama-js";

 export class SocketMgr {
    static socket: nakama.socket;

    /**查找用户信息 */
    static Set(v) {
        this.socket = v
    }
    /**设置用户信息 */
    static Get() {
        return this.socket;
    }

}

export { SocketMgr as socketMgr };