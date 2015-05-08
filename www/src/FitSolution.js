var FitSolution = {
	resolutionSize : null,
	screen_designed_width_rate : null,
	screen_designed_height_rate : null,
	
	setScreen_designed_rate:function(screenSize, designedSize){
        this.screen_designed_width_rate = screenSize.width / designedSize.width;
    	this.screen_designed_height_rate = screenSize.height / designedSize.height;
    },
	//控件用该适配模式
	scaleRateShowAll:function () {
		return 	this.screen_designed_width_rate < 
				this.screen_designed_height_rate ? 
				this.screen_designed_width_rate : 
				this.screen_designed_height_rate;
	},
	//背景用此适配模式
	scaleRateNoBoard:function () {
		return 	this.screen_designed_width_rate > 
				this.screen_designed_height_rate ? 
				this.screen_designed_width_rate : 
				this.screen_designed_height_rate;
	},
	scaleRateByHeight:function () {
		return this.screen_designed_height_rate;
	}
	
}