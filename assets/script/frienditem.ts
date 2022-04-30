
import { _decorator, Component, Node,Label,Button } from 'cc';
const { ccclass, property } = _decorator;
import { default as nakama } from "@heroiclabs/nakama-js";
import { NKM } from "./nakama/nakama";
/**
 * Predefined variables
 * Name = frienditem
 * DateTime = Sat Apr 30 2022 18:31:18 GMT+0800 (中国标准时间)
 * Author = 0990
 * FileBasename = frienditem.ts
 * FileBasenameNoExtension = frienditem
 * URL = db://assets/script/frienditem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('frienditem')
export class frienditem extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: Label})
    public nickname: Label | null = null;
    @property({type: Button})
    public acceptBtn:Button|null = null;
    @property({type: Button})
    public rejectBtn:Button|null = null;
    @property({type: Button})
    public deleteBtn:Button|null = null;

    private friend:nakama.friend;
    start () {
        // [3]
    }

    setItemData(friend) {
        this.friend = friend
        const status = this.friend.state
        this.nickname.string = this.friend.user.username;

        switch (status){
            case 0:
                this.acceptBtn.node.active = false;
                this.rejectBtn.node.active = false;
                this.deleteBtn.node.active = true;
                break
            case 1:
                this.acceptBtn.node.active = false;
                this.rejectBtn.node.active = false;
                this.deleteBtn.node.active = false;
                break
            case 2:
                this.acceptBtn.node.active = true;
                this.rejectBtn.node.active = true;
                this.deleteBtn.node.active = false;
                break
            default:
                this.acceptBtn.node.active = false;
                this.rejectBtn.node.active = false;
                this.deleteBtn.node.active = false;
        }
    }

    async onClickAcceptBtn(){
        await NKM.client.addFriends(NKM.session, this.friend.user.id);
    }

    onCickRejectBtn(){
        this.onCickRejectBtn()
    }

    async onClickDeleteBtn(){
        var ids = [this.friend.user.id];
        await NKM.client.deleteFriends(NKM.session, ids);
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
