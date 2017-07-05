/**
 * 游戏对象
 */
var Game = (function () {
    var WebGL = Laya.WebGL;

    function Game() {
        Laya.init(750, 1334, WebGL);
        Laya.stage.scaleMode = "showall";
        Laya.stage.screenMode = "vertical";

        Laya.loader.load("res/atlas/dice.json", Laya.Handler.create(this, this.init), null, Laya.Loader.ATLAS);

    }

    Game.prototype.init = function () {
        // 请求接口
        this.GameView = new GameView();


        var http = new Laya.HttpRequest(),
            pram = {
                userId: "1234"
            };

        http.send("data/init.json", pram, "get", "json");

        http.once(Laya.Event.COMPLETE, this, function (data) {

            this.GameView.init(data.userBean, data.btnType);

            //往期记录
            this.GameView.recordData(data.record);

            if (!data.state) {

                //初始投注画布
                this.GameView.canvas(data.userInvest);

            }


        })


        //请求新闻接口
        this.GameView.noticeAntiate();

        Laya.stage.addChild(this.GameView);
    };

    return Game;

}());

new Game();