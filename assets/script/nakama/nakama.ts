import { default as nakama } from "@heroiclabs/nakama-js";

export class NakamaInstance {
    static useSSL:boolean = false
    static client:nakama.Client = null;
    static socket:nakama.Socket = null;
    static session:nakama.Session = null;


    static createClient(host,port,useSSL){
        this.useSSL = useSSL
        this.client = new nakama.Client("defaultkey",host,port,this.useSSL);
        return this.client
    }


    static async tryAuthByLocalToken(){
        await this.checkSessionAndAuth()
    }

    static async auth(authType,username,password){
        await this.createSession(authType,username,password);
        await this.establishSocketConnection();
    }

    static async checkSessionAndAuth(){
        // var authToken = localStorage.getItem("nakameAuthToken");
        // if (authToken&&authToken!=""){
        //     console.log("session found");
        //     var session = Session.restore(authToken);

        // }
    }

    static async establishSocketConnection(){
        const trace = false;
        this.socket = this.client.createSocket(this.useSSL,trace);
        this.socket.ondisconnect = (evt) => {
                console.info("Disconnected", evt);
        };
        await this.socket.connect(this.session,true)
    }

    static async createSession(authType,username,password){
        this.session = await this.client.authenticateEmail(username, password);
        return this.session
    }

    static async getAccount(){
        return await this.client.getAccount(this.session)
    }
}

export { NakamaInstance as NKM };