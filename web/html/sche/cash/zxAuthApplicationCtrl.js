var toApp = angular.module("zxAuthApplicationApp", ['commonApp']);
toApp.controller("zxAuthApplicationCtrl", ["$scope","commonService","$timeout",function($scope,commonService,$timeout) {
	var myManage={
		init:function(){
			$scope.query = {};
			$scope.add = {};
			$scope.audit = {};
			$scope.auditView = {};
			this.bindEvent();
			var id = getQueryString("id");
			if(id!=''&&id!=undefined&&id!=null){
				$scope.getApplicationById(id);
			}
		},
		bindEvent:function(){
			$scope.param = this.param;
		    $scope.getApplicationById = this.getApplicationById;
		    $scope.auditSts = this.auditSts;
		    $scope.close = this.close;
		},
		close:function(){
			commonService.closeToParentTab(true);
		},
		auditSts:function(state){
			var auditNote = $scope.audit.auditNote;
			var appId = $scope.audit.id;
			var param = {"appId":appId,"state":state,"auditNote":auditNote};
			var url = "cashManageBO.ajax?cmd=doUpdateApplication";
			commonService.postUrl(url,param,function(data){
				if(data!=null && data!=undefined && data!=""){
					commonService.alert("操作成功!");
					$scope.close();
				}
				
			});
		},
		params:{
		},
		getApplicationById:function(id){
			var param = {"id":id};
			var url = "cashManageBO.ajax?cmd=getApplicationById";
			commonService.postUrl(url,param,function(data){
				if(data!=null && data!=undefined && data!=""){
					$scope.audit = data.ca;
					$scope.auditView=data.cad;
					var param = {"serviceId":data.ca.workerId};
					var url = "cashManageBO.ajax?cmd=doQueryCom";
					commonService.postUrl(url,param,function(data){
						//成功执行
						if(data!=null && data!=undefined && data!=""){
							$scope.sf=data;
						}
					});
	 	    	}
			});
		},
	
	};
	myManage.init();
}]);
