
import { _decorator, Component, Node, EditBox,director,Label  } from 'cc';
const { ccclass, property } = _decorator;

import { user } from "./data/userData";

/**
 * Predefined variables
 * Name = main
 * DateTime = Wed Apr 20 2022 16:50:08 GMT+0800 (中国标准时间)
 * Author = 0990
 * FileBasename = main.ts
 * FileBasenameNoExtension = main
 * URL = db://assets/main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('login')
export class login extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: Label})
    username: Label = null;

    async start() {
        var account = user.GetUserBase("account")
        console.log(account.email)
        this.username.string = account.email+"_"+account.user.username

        var socket = user.GetUserBase("socket")
        var sess = user.GetUserBase("session")
        socket.ondisconnect = (evt) => {
            console.info("Disconnected", evt);
        };

        const session = await socket.connect(sess);

    }

    async onLoad(){

    }


    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
