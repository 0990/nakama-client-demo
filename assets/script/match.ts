
import { _decorator, Component, Node,EditBox,Label } from 'cc';
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
 
@ccclass('match')
export class match extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: EditBox})
    public matchID: EditBox | null = null;
    @property({type: EditBox})
    public matchdata: EditBox | null = null;

    private match_id:string = null;


    start () {
        var socket = NKM.socket;

        socket.onmatchpresence = (presences) => {
            console.log("onmatchpresence",presences);
        };

        socket.onmatchdata  = (result) => {
            var content = result.data;
            switch(result.op_code){
                case 101:
                    console.log("A custom opcode.");
                    break
                default:
                    console.log("User %o send %o",result.presence.user_id,content);
            }
            console.log("onmatchdata",result);
        };
    }

    async onClickBtnCreateJoinRoom(){
        const matchID = this.matchID.textLabel.string

        if (matchID.length==0){
            await this.createMatch();
        }else{
            await this.joinMatch(matchID);
        }
    }

    async createMatch(){
        var socket = NKM.socket;
        var response  = await socket.createMatch();
        console.log("match response",response);
        this.match_id = response.match_id;
        this.matchID.string = response.match_id;
       // this.matchID.textLabel.string = response.match_id;
    }

    async joinMatch(matchID:string){
        var match  = await NKM.socket.joinMatch(matchID);
        this.match_id = matchID;
        console.log("match",match);
       // var connectdOpponents  = match.presences.filter((presence)=>{
       //     return presence.user_id !=match.self.user_id;
       // });

       // connectdOpponents.forEach((opponent)=>{
            
       // })
    }

    async onClickBtnSendMsg(){
        try{
            var msg = this.matchdata.textLabel.string;
            const chatMsg =JSON.parse(msg)
            var socket = NKM.socket;
            socket.sendMatchState(this.match_id, 1,chatMsg);
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
