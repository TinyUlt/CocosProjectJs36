
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var mainscene = ccs.load(res.MainScene_json);
        //this.addChild(mainscene.node);
        
         this.socket = io.connect();
 
        this.socket.on('connect', function() {
            cc.log("connect");

        });

        this.socket.emit('login', "tom");
        this.socket.on('loginSuccess', function() {
            cc.log("loginSuccess");
        });

        this.socket.emit('startTimeUpdate');
        
        
        //var origin = cc.director.getVisibleOrigin(), size = cc.director.getVisibleSize();


        var statusLabel = new cc.LabelTTF("waiting!", "", 20);
        statusLabel.setPosition(0 + size.width / 2, 0 + size.height - 90);
        this.addChild(statusLabel);

        this.socket.on('timeUpdate', function(myDate) {
            
            cc.log("123");
            statusLabel.setString(myDate);
            statusLabel.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.5), cc.fadeOut(0.4)));

        });

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

