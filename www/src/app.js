/*
1.把鱼绘制出来

 */
 /** 适配说明
  * 1.cocostudio中让层进行缩放适配, 当窗口缩放时, 层也的尺寸会进行缩放
  * 2.当第一种情况发生时, 如果层中的容器不进行位置适配, 则位置不变.
  * 3.当第一种情况发生时, 如果层中的容器进行位置适配, 则位置会根据比例适配.
  * 3.当第一种情况发生时, 如果层中的容器不进行缩放适配, 则尺寸不变.
  * 4.当第一种情况发生时, 如果层中的容器进行缩放适配, 则尺寸会根据比例适配.
  * 5.当第一种情况发生时, 如果层中的容器进行位置和缩放适配, 则位置和尺寸都会根据比例适配.
  * 6.当第一种情况发生时, 层中附加的图片尺寸不变.
  * 7.如果对容器进行缩放, 子容器也会缩放.
  * 
  * cocostudio做位置的适配, FitSolution做尺寸的适配.
  */
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    Panel_help:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        
        
        var size = cc.winSize;
        cc.log(size.width);
        cc.log(size.height);
        
        //服务器连接测试
         this.socket = io.connect();
 
        this.socket.on('connect', function() {
            cc.log("connect");

        });

        this.socket.emit('login', "tom");
        this.socket.on('loginSuccess', function() {
            cc.log("loginSuccess");
        });

        this.socket.emit('startTimeUpdate');
        
        var statusLabel = new cc.LabelTTF("waiting!", "", 20);
        statusLabel.setPosition(0 + size.width / 2, 0 + size.height - 90);
        this.addChild(statusLabel,10);

        this.socket.on('timeUpdate', function(myDate) {
            
            cc.log("123");
            statusLabel.setString(myDate);
            statusLabel.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.5), cc.fadeOut(0.4)));

        });
        //////////////////////////////////////
        
        var mainscene = ccs.load(res.GameScene_json);
        this.addChild(mainscene.node);
        
        var Panel_help = ccui.helper.seekWidgetByName(mainscene.node, "Panel_help");
      
        mainscene.node.setContentSize(size);
        ccui.helper.doLayout(mainscene.node);
       
       
       Panel_help.scale = (FitSolution.scaleRateShowAll());
       
//        var frameSize = cc.view.getFrameSize(); 
//            cc.log(frames.width);
        
        cc.view.setResizeCallback(function() {

            cc.log("chang;");
            var screenSize = cc.view.getFrameSize();
            
            cc.view.setDesignResolutionSize(screenSize.width, screenSize.height, cc.ResolutionPolicy.SHOW_ALL);
            FitSolution.setScreen_designed_rate(screenSize, new cc.size(960, 640));
       
            mainscene.node.setContentSize(screenSize);
            ccui.helper.doLayout(mainscene.node);
            
            Panel_help.scale = (FitSolution.scaleRateShowAll());
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

