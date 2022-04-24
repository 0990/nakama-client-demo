
import { _decorator, Component, Node,EditBox,Label, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

import { user } from "./data/userData";
import { default as nakama } from "@heroiclabs/nakama-js";
import { NKM } from "./nakama/nakama";

/**
 * Predefined variables
 * Name = chat
 * DateTime = Sun Apr 24 2022 17:28:22 GMT+0800 (中国标准时间)
 * Author = 0990
 * FileBasename = chat.ts
 * FileBasenameNoExtension = chat
 * URL = db://assets/script/chat.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('chat')
export class chat extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: EditBox})
    public roomname: EditBox | null = null;
    @property({type: EditBox})
    public chatmsg: EditBox | null = null;
    @property({type: Label})
    public roommsg: Label | null = null;
    @property({type: ScrollView})
    public scrollView: ScrollView | null = null;

    private channel:nakama.channel;

    start () {
        var socket = NKM.socket;
        // [3]
        socket.onchannelmessage = (message) => {
            console.info("Message received from channel", message.channel_id);
            console.info("Received message", message);
            this.roommsg.string+= message.username+":"+JSON.stringify(message.content)+'\n';
            this.scrollView.scrollToBottom(0);
        };
    }

    async onClickBtnJoinRoom(){
        var socket = NKM.socket;
        const type : number = 1;
        const roomname = this.roomname.textLabel.string;
        const persistence : boolean = false;
        const hidden : boolean = false;

        console.log("roomname",roomname);

        const channel = await socket.joinChat(roomname, type, persistence, hidden);
        this.channel = channel;
    }

    async onClickBtnSendMsg(){
        try{
            var msg = this.chatmsg.textLabel.string;
            const chatMsg =JSON.parse(msg)
            var socket = NKM.socket;
            socket.writeChatMessage(this.channel.id, chatMsg);
        }catch(err){
            console.log("Error JSON.parse",err);
        }

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
