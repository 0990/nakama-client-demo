
import { _decorator, Component, Node,EditBox,Label, ScrollView,Prefab,instantiate} from 'cc';
const { ccclass, property } = _decorator;

import { user } from "./data/userData";
import { default as nakama } from "@heroiclabs/nakama-js";
import { NKM } from "./nakama/nakama";

/**
 * Predefined variables
 * Name = friend
 * DateTime = Sun Apr 24 2022 17:28:22 GMT+0800 (中国标准时间)
 * Author = 0990
 * FileBasename = friend.ts
 * FileBasenameNoExtension = friend
 * URL = db://assets/script/friend.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('friend')
export class friend extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: EditBox})
    public friendname: EditBox | null = null;
    @property({type: ScrollView})
    public list_scrollView: ScrollView | null = null;
    @property({type: Prefab})
    public friendItem: Prefab|null =null;
    @property({type: ScrollView})
    public accept_scrollView: ScrollView | null = null;
    @property({type: ScrollView})
    public request_scrollView: ScrollView | null = null;

    async start () {
        await this.fresh();
    }

    async listFriend(){
        var limit = 20; // Limit is capped at 1000
        var friendshipState = 0;
        var result = await NKM.client.listFriends(NKM.session, friendshipState, limit, null);

        console.log(result);
        this.list_scrollView.content.removeAllChildren();
        result.friends.forEach((friend) => {
            console.log(friend)
            console.log("ID: %o", friend.user.id);

            var slot = instantiate(this.friendItem);
            slot.getComponent("frienditem").setItemData(friend);
            this.list_scrollView.content.addChild(slot);
        });
    }

    async listAcceptFriend(){
        var limit = 20; // Limit is capped at 1000
        var friendshipState = 2;
        var result = await NKM.client.listFriends(NKM.session, friendshipState, limit, null);

        console.log(result);
        this.accept_scrollView.content.removeAllChildren();
        result.friends.forEach((friend) => {
            console.log(friend)
            console.log("ID: %o", friend.user.id);

            var slot = instantiate(this.friendItem);
            slot.getComponent("frienditem").setItemData(friend);
            this.accept_scrollView.content.addChild(slot);
        });
    }

    async listRequestFriend(){
        var limit = 20; // Limit is capped at 1000
        var friendshipState = 1;
        var result = await NKM.client.listFriends(NKM.session, friendshipState, limit, null);

        console.log(result);
        this.request_scrollView.content.removeAllChildren();
        result.friends.forEach((friend) => {
            console.log(friend)
            console.log("ID: %o", friend.user.id);

            var slot = instantiate(this.friendItem);
            slot.getComponent("frienditem").setItemData(friend);
            this.request_scrollView.content.addChild(slot);
        });
    }

    async onClickBtnAddFriend(){
        var socket = NKM.socket;
        const type : number = 1;
        const friendname = this.friendname.textLabel.string;
        var usernames = [friendname];
        await NKM.client.addFriends(NKM.session,null, usernames);

        this.scheduleOnce(function() {
            this.listRequestFriend();
        }, 1);
    }

    async onClickFresh(){
        await this.fresh();
    }

    async fresh(){
        await this.listFriend();
        await this.listAcceptFriend();
        await this.listRequestFriend();
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
