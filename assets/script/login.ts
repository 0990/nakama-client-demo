
import { _decorator, Component, Node, EditBox,director,Label,ToggleContainer} from 'cc';
const { ccclass, property } = _decorator;

import { default as nakama } from "@heroiclabs/nakama-js";

import { user } from "./data/userData";
import { NKM } from "./nakama/nakama";

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
 
@ccclass('main')
export class main extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: EditBox})
    public email: EditBox | null = null;
    @property({type: EditBox})
    public password: EditBox | null = null;
    @property({type: EditBox})
    public username: EditBox | null = null;
    @property({type: Label})
    public showTip: Label | null = null;
    @property({type: ToggleContainer})
    public loginTypeTG:ToggleContainer |null = null;

    start () {
        // [3]

    }

    async onLoad(){
        this.getLoginType();
    }

    async onClickBtnLogin(){
        console.log("onClickBtnLogin");
        console.log(nakama);
       var useSSL = false; // Enable if server is run with an SSL certificate.
       // var client = new nakama.Client("defaultkey", "127.0.0.1", "7350", useSSL);
       // console.log(nakama);
       // console.log(client);
       // console.log(this.username.textLabel.string);

        var client = NKM.createClient("127.0.0.1", "7350", useSSL);

        var email = this.email.textLabel.string;
        var password = this.password.textLabel.string;
        var username = this.username.textLabel.string;
        console.log(email,password,username);


        try {
            const loginType = this.getLoginType();
            switch(loginType){
                case "email":
                    await NKM.authEmail(email,password,username);
                    break
                case "id":
                    await NKM.authDeviceId(email,username);
                    break
                default:
                this.tip("不支持的登录方式");
            }

            
            var account = await NKM.getAccount();
            user.SetUserBase("account",account)
            this.loginSuccess()
        }
        catch (err) {
            console.log("Error authenticating email:", err);
            this.loginFail()
        }
    }

    getLoginType(){
        var loginType = "email";
        this.loginTypeTG.toggleItems.forEach(toggle=>{
            if (toggle.isChecked){
                loginType = toggle.node.getChildByName("Label").getComponent("cc.Label").string;
            }
        })
        return loginType;
    }

    loginSuccess(){
        director.loadScene("lobby")
    }

    loginFail(){
        this.tip("登录失败，请重试！")
    }

    tip(tip:string){
        this.showTip.string = tip;
        this.scheduleOnce(function() {
            this.showTip.string = ""
        }, 1);
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
