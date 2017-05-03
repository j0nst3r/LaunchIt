angular.module('uiController', []).factory('uiController', [function() {
    var controller = {}
    controller.setup = function(windowInnerWidth) {
        var columnSpec = []
        if(windowInnerWidth < 768){
			//only want 1 column
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 1, "rem": 0}
			columnSpec.push(columnObj);
		}else if(windowInnerWidth < 1000){
			//want 2 column
			var columnObj = {};
			columnObj.size = 50;
			columnObj.ngif = {"col" : 2, "rem": 0}
			columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 50;
			columnObj.ngif = {"col" : 2, "rem": 1}
            columnSpec.push(columnObj);
			
		}else{
			//want 3 column
			var columnObj = {};
			columnObj.size = 33;
			columnObj.ngif = {"col" : 3, "rem": 0}
			columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 33;
			columnObj.ngif = {"col" : 2, "rem": 1}
			columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 33;
			columnObj.ngif = {"col" : 3, "rem": 2}
			columnSpec.push(columnObj);
		}
        return columnSpec
    }

	return controller

}])
