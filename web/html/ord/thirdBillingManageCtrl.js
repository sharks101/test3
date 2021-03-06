var thirdBillingManageApp = angular.module("thirdBillingManageApp", ['commonApp']);
thirdBillingManageApp.controller("thirdBillingManageCtrl", ["$scope","commonService","$timeout",'$filter','$rootScope',function($scope,commonService,$timeout,$filter,$rootScope) {
	var thirdBillingManage={
		init:function(){
			this.userData();
			//this.queryOrg();
			this.bindEvent();
//			this.doQuery();
			this.selectUserOrg();
			this.initStaticData();
			var returnKeyEventDomEleIds = ["beginTime","endTime","id3","id4","id5","id6","id7","id8","id9","id10"];
		    commonService.registerKeyEventForDoms(returnKeyEventDomEleIds, "keydown", "return", $scope.doQuery);
		},
		bindEvent:function(){
			$scope.param=this.param;
			$scope.doQuery=this.doQuery;
		    $scope.toDel=this.toDel;
		    $scope.print=this.print;
		    $scope.doQueryVehicleState=this.doQueryVehicleState;
		    $scope.queryOrg=this.queryOrg;
		    $scope.addView= this.addView;
		    $scope.toView=this.toView;
		    $scope.toEdit=this.toEdit;
		    $scope.toEditSign=this.toEditSign;
		    $scope.query=this.query;
		    $scope.clear=this.clear;
		    $scope.selectAll=this.selectAll;
		    $scope.doSave=this.doSave;
		    $scope.selectOne=this.selectOne;
		    $scope.toAudit = this.toAudit;
		    
		    $scope.upNum = this.upNum;
		    $scope.toDetailAllInfo = this.toDetailAllInfo;
		    $scope.isTrue = false;
		    $scope.commonExport = this.commonExport;
		    $scope.paramsExport = "{}";
		    $scope.showView = this.showView;
		    $scope.toTransfer = this.toTransfer;
		    $scope.posting = this.posting;
		    $scope.openUp=this.openUp;
		    $scope.closeUp=this.closeUp;
		    $scope.doSavePic=this.doSavePic;
		},
		//获取静态数据
		initStaticData:function(){
			//获取查询类型
			commonService.postUrl("staticDataBO.ajax?cmd=selectQueryType","",function(data){
				if(data != null && data != undefined && data != ""){
					$scope.queryTypeDate = data;
					$scope.query.queryType = $scope.queryTypeDate.items[0].codeValue;
				}
			});
			commonService.postUrl("staticDataBO.ajax?cmd=selectPaymentType","",function(data){
				if(data != null && data != undefined && data != ""){
					var defaultObj = {codeValue: -1, codeName: '全部'};
					var array = new Array()
					array.push(defaultObj);
					for(var i = 0; i < data.items.length; i++) {
						array.push(data.items[i]);	
					}
					$scope.paymentTypeData = array;
					$scope.query.paymentType = -1;
				}
			});
			//默认一个开始时间
			//$scope.query.beginTime =$filter('date')( new Date(),'yyyy-MM-dd');
			//document.getElementById("beginTime").value=$filter('date')( new Date(),'yyyy-MM-dd');
			
			
		},
		//导出方法
		commonExport : function(){
			if($scope.isTrue){
				return false;
			}
			
			var beginTime = document.getElementById("beginTime").value;
			var endTime = document.getElementById("endTime").value;
			
			if(beginTime==undefined || beginTime==null || beginTime==""){
				commonService.alert("导出运单数据的开始时间不能为空，请选择开始时间！");
				return false;
			}
			
			if(endTime==undefined || endTime==null || endTime==""){
				commonService.alert("导出运单数据的结束时间不能为空，请选择结束时间！");
				return false;
			}
			
			var date1=new Date(beginTime);
			var date2=new Date(endTime);
			var date3=date2.getTime()-date1.getTime();//时间差的毫秒数
			//计算出相差天数
			var days=Math.floor(date3/(24*3600*1000));
			
			if(days>31){
				commonService.alert("只能导出一个月的数据，请重新选择时间！");
				return false;
			}
				
			
			
			
			$scope.isTrue = true;
			$("#exportId").html("导出中。");
			
			$scope.page.downloadExcelFile();
			
			//导出倒计时
			$timeout(function() {
				 $scope.isTrue = false;
				$("#exportId").html("导出");
			},3600);
			
		},
		toTransfer:function(){
			var selectedValue =$scope.page.getSelectData();
			if(selectedValue.length<=0){
				commonService.alert("请选择一条运单信息");
				return false;
			}
			if(selectedValue.length>1){
				commonService.alert("只能选择一条运单信息");
				return false;
			}
			var url ="transferBO.ajax?cmd=isTransfer"
			commonService.postUrl(url,"orderId="+selectedValue[0].orderId,function(data){
				if(data != null && data != undefined && data != ""){
					if(data.isOk == "Y"){
						commonService.openTab(orderId,"运单中转","/ord/ordBillingDetailTransfer.html?view=1&trackingNum="+selectedValue[0].trackingNum+"&orderId="+selectedValue[0].orderId);
					}
				}
			});
		},
		toDetailAllInfo: function(obj){
			//window.open("/ord/ordBillingDetail.html?view=1&orderId="+obj.orderId+"&trackingNum="+obj.trackingNum);
			commonService.openTab(obj.orderId,"运单详情","/ord/ordBillingDetail.html?isTab=1&view=1&orderId="+obj.orderId+"&trackingNum="+obj.trackingNum);
			
		},
		upNum:function(valueName){
			var value = eval("$scope."+valueName).replace(/[^\d]/g, '');
			eval("$scope."+valueName+"=value");
		},
		query:{
			page:1,
			rows:10,
			orderState:"-1",
		},
		userData:function(){
			$scope.currOrgId=userInfo.orgId;
			$scope.currOrgName=userInfo.orgName;
		},
		/**查询开单网点**/
		selectUserOrg:function(){
			$scope.isShow=true;
			commonService.postUrl("webCmUserInfoBO.ajax?cmd=getUserOrgType","",function(data){
				if(data != null && data != undefined && data != ""){
					$scope.orgData= data.orgList;
					$scope.orgType= data.orgType;
					if($scope.orgType==2){
						$scope.isShow=false;
						$scope.orgData.unshift({orgId:-1,orgName:'全部'});
						$scope.query.orgId=-1;
					}else{
						$scope.query.orgId=$scope.orgData[0].orgId;
						$scope.queryOrg();
						$scope.isShow=true;
					}
					
				}
			});
		},

		
		//上传图片
		openUp:function(){
			$scope.orderPic=true;
			var ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            if(ordArray.length>1){
            	commonService.alert("只能选择一条运单信息!");
				return false;
            }
            $scope.orderUpPic=true;
			var orderId="";
			var data=ordArray[0];
			orderId=data.orderId;
			var param = {"orderId":orderId};
			var url = "ordUploadPicBO.ajax?cmd=queryOrderPic";
			commonService.postUrl(url,param,function(data){
				if(data!=null && data!=undefined && data!=""){
						if(data.flowId!=""&&data.flowId!=null&&data.flowId!=undefined){
							var flowIdArr=data.flowId.split(",");
							if(flowIdArr.length==5){
								$scope.orderPic=false;
							}
							for (i=0;i<flowIdArr.length ;i++ )   
						    {   
						        eval("$rootScope.idenCard"+(i+1)+".initDate("+flowIdArr[i]+")");
						        eval( "$rootScope.idenCard"+(i+1)+".isUpShow(false)"); 
						    }   
						}
	 	    	}
			});
		},
		closeUp:function(){
			$rootScope.idenCard1.clean();
			$rootScope.idenCard2.clean();
			$rootScope.idenCard3.clean();
			$rootScope.idenCard4.clean();
			$rootScope.idenCard5.clean();
			$rootScope.idenCard1.isUpShow(true);
			$rootScope.idenCard2.isUpShow(true);
			$rootScope.idenCard3.isUpShow(true);
			$rootScope.idenCard4.isUpShow(true);
			$rootScope.idenCard5.isUpShow(true);
			$scope.orderUpPic=false;

		},
		//保存图片
		doSavePic:function(){
			var flowId='';
			var orderId='';
			var trackingNum='';
			var ordArray=$scope.page.getSelectData();
        	var data= ordArray[0];
        	taskId=data.taskId;
			orderId=data.orderId;
			trackingNum=data.trackingNum;
			if($rootScope.idenCard1.get().flowId!=null && $rootScope.idenCard1.get().flowId!=undefined && $rootScope.idenCard1.get().flowId!=''){
				flowId=$scope.idenCard1.get().flowId;
			}
			if($rootScope.idenCard2.get().flowId!=null && $rootScope.idenCard2.get().flowId!=undefined && $rootScope.idenCard2.get().flowId!=''){
				if(flowId!=''){
					flowId+=","+$rootScope.idenCard2.get().flowId;
				}else{
					flowId+=$rootScope.idenCard2.get().flowId;
				}
			}
			if($rootScope.idenCard3.get().flowId!=null && $rootScope.idenCard3.get().flowId!=undefined && $rootScope.idenCard3.get().flowId!=''){
				if(flowId!=''){
					flowId+=","+$rootScope.idenCard3.get().flowId;
				}else{
					flowId+=$rootScope.idenCard3.get().flowId;
				}
			}
			if($rootScope.idenCard4.get().flowId!=null && $rootScope.idenCard4.get().flowId!=undefined && $rootScope.idenCard4.get().flowId!=''){
				if(flowId!=''){
					flowId+=","+$rootScope.idenCard4.get().flowId;
				}else{
					flowId+=$rootScope.idenCard4.get().flowId;
				}
			}
			if($rootScope.idenCard5.get().flowId!=null && $rootScope.idenCard5.get().flowId!=undefined && $rootScope.idenCard5.get().flowId!=''){
				if(flowId!=''){
					flowId+=","+$rootScope.idenCard5.get().flowId;
				}else{
					flowId+=$rootScope.idenCard5.get().flowId;
				}
			}
			var param = {"orderId":orderId,"flowId":flowId,"trackingNum":trackingNum};
			var url = "ordUploadPicBO.ajax?cmd=doSaveOrderPic";
			commonService.postUrl(url,param,function(data){
				if(data!=null && data!=undefined && data!=""){
					$scope.closeUp();
					commonService.alert("上传成功!");
					$scope.doQuery();
	 	    	}
			});
		},	
		/**全选*/
		selectAll : function() {
			var checkbox = document.getElementsByName("check-1");
			if (document.getElementById("checkbox").checked) {
				for (var i = 0; i < checkbox.length; i++) {
					checkbox[i].checked = true;
				}
			} else {
				for (var i = 0; i < checkbox.length; i++) {
					checkbox[i].checked = false;
				}
			}
		},
		/**订单列表查询*/
		doQuery:function(flag){
			var url = "orderInfoBO.ajax?cmd=queryOrderInfo";
			thirdBillingManage.query.page=1;
			thirdBillingManage.query.needIngoreOrgId=true;
			thirdBillingManage.query.orderType = 0;
			/*if(flag==1){
				if(document.getElementById("beginTime").value==null
						||document.getElementById("beginTime").value==undefined
							||document.getElementById("beginTime").value==''){
					commonService.alert("抱歉!开单日期时间为必查条件!");
					return false;
				}
			}*/
			$scope.query.beginTime = document.getElementById("beginTime").value;
			$scope.query.endTime = document.getElementById("endTime").value;
			$scope.tableCallBack=function(){
//				commonService.refreshPageContentHeight($scope.page.data.items.length, 663, 270);
				setContentHegthDelay();
				$scope.paramsExport = JSON.stringify(thirdBillingManage.query)
			}
			$timeout(function(){
				$scope.page.load({
							url:url,
							params:thirdBillingManage.query,
							callBack:"$scope.tableCallBack"
						});
			},500);
		},
		/**清空查询条件*/
		clear:function(){
			document.getElementById("beginTime").value='';
			document.getElementById("endTime").value='';
			$scope.query.beginTime='';
			$scope.query.endTime='';
			$scope.query.trackingNum="";
			$scope.query.descOrgId=-1;
			$scope.query.orderState="-1";
			$scope.query.consignorBill = "";
			$scope.query.consigneeBill = "";
			$scope.query.inputUserName = "";
			$scope.query.queryValue = "";
			$scope.query.paymentType = -1;
		},
		/**网点列表查询*/
		queryOrg:function(){
			var beginOrgId = $scope.query.orgId;
			commonService.postUrl("routeBO.ajax?cmd=getCurrRoute","",function(data){
				if(data != null && data != undefined && data != ""){
					$scope.orgInfo = data;
					if(data.items != null && data.items != undefined && data.items != ""){
						$scope.orgInfo.items.unshift({endOrgId:-1,endOrgName:'全部'});
					}
					$scope.query.descOrgId = -1;
				}
			});
		},
		/**选择一行**/
		selectOne : function(orderId){
			if(document.getElementById("checkbox"+orderId).checked && document.getElementById("checkbox"+orderId) != undefined){
				document.getElementById("checkbox"+orderId).checked=false;
			}else{
				document.getElementById("checkbox"+orderId).checked=true;
			}
		},
		/**运单录入**/
		addView:function(){
			commonService.openTab("1","运单录入","/ord/thirdBilling.html");
			//commonService.openTab("1","运单录入","/ord/billing.html?sellerOrderId=7");
		},
		/**打印**/
		toView:function(viewType){
			var orderId='';
			var orgId='';
			var trackingNum='';
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            if(ordArray.length>1){
				commonService.alert("只能选择一条运单信息!");
				return false;
			}
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	orderId=data.orderId;
				orgId=data.orgId;
				trackingNum=data.trackingNum;
            }
			if($scope.orgType==2){
			    commonService.openTab("/ord/thirdBilling.html?view=1&orderId="+orderId+"&orgId="+orgId);
			}else{
				if(viewType==1){
					window.open("/ord/ordBillingDetail.html?isShowReturn=false&view=1&trackingNum="+trackingNum+"&type=3");
				}
				else
				{
					 commonService.openTab(orderId,"运单打印详情","/ord/ordBillingDetail.html?view=1&orderId="+orderId+"&trackingNum="+trackingNum);
				}
			}
		},
		
		/**查看**/
		showView:function(){
			var orderId='';
			var orgId='';
			var trackingNum='';
			var ordArray = new Array();
             ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            if(ordArray.length>1){
				commonService.alert("只能选择一条运单信息!");
				return false;
			}
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	orderId=data.orderId;
				orgId=data.orgId;
				trackingNum=data.trackingNum;
            }
			window.open("/ord/ordBillingDetail.html?view=1&orderId="+orderId+"&trackingNum="+trackingNum);
		},
		
		
		toAudit:function(){
			if($scope.isTrue){
				return false;
			}
			var orderId='';
			var orderIds = "";
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
			var orderCheckLength = ordArray.length;
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            var postTrue = false;
            for(var i=0;i<ordArray.length;i++){
            	var dataStr= ordArray[i];
            	if(dataStr !=null && dataStr != undefined && dataStr != ''){
            		var data = ordArray[i];
					orderId = data.orderId;
					orderIds = orderIds + data.orderId+",";
					if(data.orderState != 1){
						if(orderCheckLength == 1){
							commonService.alert("运单["+data.trackingNum+"]状态为"+data.orderStateName+",不允许审核!");
						}else{
							commonService.alert("运单["+data.trackingNum+"]状态为"+data.orderStateName+",不允许批量审核,请去除该运单选项!");
						}
						postTrue =  true;
						return false;
					}
				}
            }
			//存在非待审核的订单
			if(postTrue){
				return false;
			}
			var url = "orderInfoBO.ajax?cmd=auditOrderInfo";
			$scope.isTrue = true;
			$("#auditId").html("审核中。");
			commonService.postUrl(url,"orderIds="+orderIds,function(data){
				//成功执行
				if(data != null && data != undefined && data!=""){
					if(orderCheckLength == 1){
						commonService.alert("审核成功!");
					}else{
						commonService.alert("批量审核成功!");
					}
					$scope.doQuery();
					$scope.isTrue = false;
					$("#auditId").html("运单审核");
	 	    	}
			});
			
			//如果后台报错（需要使用定时器还原）
			$timeout(function(){
				$scope.isTrue = false;
				$("#auditId").html("运单审核");
			},5000);
		},
		
		//修改签收后的数据
		toEditSign:function(oper){
			var orderId='';
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            if(ordArray.length>1){
				commonService.alert("只能选择一条运单信息!");
				return false;
			}
            
            var flag=false;
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	if(data.orderState!=5){
					flag=true;
					commonService.alert("订单["+data.trackingNum+"]状态不是已签收，不可以操作!");
					return false;
				}
            	orderId=data.orderId;
            }
			if(flag){
				return false;
			}
			commonService.openTab(orderId + 9519519511,"修改签收运单","/ord/thirdBilling.html?edit=1&orderId="+orderId);
		},
		
		//修改
		toEdit:function(oper){
			var orderId='';
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            if(ordArray.length>1){
				commonService.alert("只能选择一条运单信息!");
				return false;
			}
            var flag=false;
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	if(data.orderState==5){
					flag=true;
					commonService.alert("订单["+data.trackingNum+"]状态为"+data.orderStateName+",不可以操作!");
					return false;
				}
            	orderId=data.orderId;
            }
			if(flag){
				return false;
			}
			if(oper=='print')
			{
				commonService.openTab(orderId + 1111951951951,"打印运单","/ord/thirdBilling.html?edit=1&print=1&orderId="+orderId);
			}
			else
			{
				commonService.openTab(orderId + 951951951,"运单修改","/ord/thirdBilling.html?edit=1&orderId="+orderId);
			}
		},
		/***保存**/
		doSave:function(){
			var param = {"isAll":"Y"};
			var url = "orderInfoBO.ajax?cmd=matchVehicle";
			commonService.postUrl(url,param,function(data){
				//成功执行
				if(data!=null && data!=undefined && data!=""){
						commonService.alert("操作成功!");
						$scope.doQuery();
	 	    	}
			});
		},
		/**打印*/
		print:function(){
		},
		/**删除*/
		toDel:function(){
			$scope.orderId="";
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	$scope.orderId += data.orderId+",";
            }
			var flag=false;
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            var flag=false;
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[i];
            	if(data.seeOrderState != 1){
					flag = true;
					commonService.alert("运单["+data.trackingNum+"]状态为"+data.seeOrderStateName+",不可以操作!");
					return false;
				}
            	$scope.orderId += data.orderId+",";
            }
			if(flag){
				return false;
			}
			var param = {"orderId":$scope.orderId};
			var url = "orderInfoBO.ajax?cmd=delOrderInfo";
			 commonService.confirm("是否删除数据?",function(){
				commonService.postUrl(url,param,function(data){
					//成功执行
					if(data!=null && data!=undefined && data!=""){
							commonService.alert("删除成功!");
							$scope.doQuery();
		 	    	}
				});
			 });
		},
		/**过账*/
		posting:function(){
			$scope.orderId="";
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[0];
            	$scope.orderId += data.orderId+",";
            }
			var flag=false;
			var ordArray = new Array();
            ordArray=$scope.page.getSelectData();
            if(ordArray.length==0){
            	commonService.alert("请至少选择一条运单信息!");
				return false;
            }
            var flag=false;
            for(var i=0;i<ordArray.length;i++){
            	var data= ordArray[i];
//            	if(data.orderState!=2&&data.orderState!=9){
//					flag=true;
//					commonService.alert("订单["+data.trackingNum+"]状态为"+data.orderStateName+",不可以操作!");
//					return false;
//				}
            	$scope.orderId += data.orderId+",";
            }
			if(flag){
				return false;
			}
			var param = {"orderId":$scope.orderId};
			var url = "orderInfoBO.ajax?cmd=postingOrderInfo";
			 commonService.confirm("是否过账?",function(){
				commonService.postUrl(url,param,function(data){
					//成功执行
					if(data!=null && data!=undefined && data!=""){
						$scope.page.reLoad(-1);
						commonService.alert("过账成功!");
		 	    	}
				});
			 });
		}
	};
	
	thirdBillingManage.init();
}]);