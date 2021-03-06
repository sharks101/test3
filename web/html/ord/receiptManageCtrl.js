function changeTabCallback(){
	var appElement = document.querySelector('[ng-controller=receiptManageCtrl]');
	var scope=angular.element(appElement).scope();
	scope.doQuery();
	scope.$apply();
}

var receiptManageApp = angular.module("receiptManageApp", ['commonApp']);
receiptManageApp.controller("receiptManageCtrl", ["$scope","commonService","$timeout",function($scope,commonService,$timeout) {
	var receiptManage={
			init:function(){
				this.userData();
				this.doQuery();
				this.bindEvent();
				
				var returnKeyEventDomEleIds = ["beginTime","endTime","id1","id2","id3","id4","id5","selectId","receipt"];
			    commonService.registerKeyEventForDoms(returnKeyEventDomEleIds, "keydown", "return", $scope.doQuery);
			},
			bindEvent:function(){
				$scope.param=this.param;
				$scope.doQuery=this.doQuery;
			    $scope.print=this.print;
			    $scope.query=this.query;
			    $scope.clear=this.clear;
			    $scope.selectAll=this.selectAll;
			    $scope.selectOne=this.selectOne;
			    $scope.receiptReturn=this.receiptReturn;
			    $scope.isTrue = false;
			    $scope.commonExport = this.commonExport;
			    $scope.paramsExport = "{}";
			    $scope.isPrintTrue = false;
			    $scope.printTable = this.printTable;
			    $scope.printData = {};
			    $scope.toView=this.toView;
			    $scope.delReturn=this.delReturn;
			    $scope.receiptBatchReturn = this.receiptBatchReturn;
			    
			},
			toView:function(trackingNum){
				window.open("/ord/ordBillingDetail.html?view=1&trackingNum="+trackingNum+"&type=3&ver=${ver}");
			},
			receiptBatchReturn : function(){
				 commonService.openTab("201524","批量回单返厂","/ord/receiptBatchReturn.html");
			},
			printTable: function(){
				if($scope.isPrintTrue){
					return false;
				}
				var params = $scope.paramsExport;
				var ps = eval("("+params+")");
				var endDate = ps.endTime;
				var beginDate = ps.beginTime;
				var isE = false;
				var isB = false;
				if(beginDate != undefined && beginDate != null && beginDate != '' ){
					isB = true;
				}
				if(endDate != undefined && endDate != null && endDate != '' ){
					isE = true;
				}
				
				if(isE && isB){
					$scope.dateTime = "从 "+beginDate +" 到 "+endDate;
				}else if(isB){
					$scope.dateTime = "从 "+ beginDate +" 到 现在";
				}else if(isE){
					$scope.dateTime = "截止 "+endDate;
				}else{
					$scope.dateTime = "";
				}
				
				var endOrgId = $scope.query.descOrgId;
				$scope.beginOrgName = $scope.currOrgName;
				$scope.endOrgName = ps.endOrgName;
				
				$scope.beginOrgNameAndEndOrgName = $scope.beginOrgName +" 到 "+$scope.endOrgName;
				$scope.printTime = new Date();
				
				ps._ALLEXPORT = 1;
				
				var url = "orderInfoBO.ajax?cmd=doReceiptQuery";
				$scope.isPrintTrue = true;
				$("#printId").html("打印中。");
				commonService.postUrl(url,ps,function(data){
					//成功执行
					if(data != null && data != undefined && data != ""){
						$scope.printData = data;
						$scope.receiptCountNum = 0;
						$scope.countNum = 0;
						$scope.freightNum = 0;
						$scope.collectingMoneyNum = 0;
						for(var i = 0;i < data.items.length;i++){
							$scope.receiptCountNum = $scope.receiptCountNum +data.items[i].receiptCount;
							$scope.countNum = $scope.countNum +data.items[i].count;
							$scope.freightNum = $scope.freightNum +data.items[i].freight;
							$scope.collectingMoneyNum = $scope.collectingMoneyNum +data.items[i].collectingMoney;
						}
						$timeout(function(){
							printTableInfo("printDiv", "众邦物流_核销管理");
							$scope.isPrintTrue = false;
							$("#printId").html("打印");
						},500);
						
		 	    	}else{
		 	    		commonService.alert("未找到数据打印失败！");
		 	    		$scope.isPrintTrue = false;
						$("#printId").html("打印");
		 	    	}
				},function(){
					commonService.alert("系统异常打印失败！");
					$scope.isPrintTrue = false;
					$("#printId").html("打印");
				});
				
	              //未安装打印软件还原按钮
				$timeout(function(){
					$scope.isPrintTrue = false;
					$("#printId").html("打印");
				},10000);
			
			},
			//导出方法
			commonExport : function(){
				if($scope.isTrue){
					return false;
				}
				/**
				 * queryUrl  格式如：commonExportBO.ajax?cmd=downloadExcelFile
				 * params   请求的参数对象:{"date":"2016-07-12"}
				 * excelLables  excel的列名: 批次号,时间
				 * excelKeys    excel的字段名称:batchNum,date 
				 */
				var excelLables = "运单号,开单网点,付款方式,回单号,回单份数,重量,体积,配送网点,件数,到付金额,收货人,收货人手机,备注,收货方式";
				var excelKeys = "trackingNum,orgIdName,paymentTypeName,receiptNum,receiptCount,weightString,volumeString,distributionOrgName,count,freightCollectString,consigneeLinkmanName,consigneeBill,remarks,deliveryTypeName";
				
				var params = $scope.paramsExport;
				var queryUrl = "orderInfoBO.ajax?cmd=doReceiptQuery";
				commonService.downloadExcelFile(queryUrl,eval("("+params+")"),excelLables,excelKeys);
				 $scope.isTrue = true;
				$("#exportId").html("导出中。");
				//导出倒计时
				$timeout(function() {
					 $scope.isTrue = false;
					$("#exportId").html("导出");
				},3600);
				
			},
			params:{
				page:1
			},
			query:{
			},
			userData:function(){
				$scope.currOrgId=userInfo.orgId;
				$scope.currOrgName=userInfo.orgName;
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
			/**列表查询*/
			doQuery:function(){
				receiptManage.params.beginTime=document.getElementById("beginTime").value;
				receiptManage.params.endTime=document.getElementById("endTime").value;
				receiptManage.params.receiptSatate=document.getElementById("receipt").value;
				receiptManage.params.descOrgId=receiptManage.query.descOrgId;
				receiptManage.params.receiptNum=receiptManage.query.receiptNum;
				receiptManage.params.trackingNum=receiptManage.query.trackingNum;
				receiptManage.params.consignorBill=receiptManage.query.consignorBill;
				receiptManage.params.consigneeBill=receiptManage.query.consigneeBill;
				var url = "orderInfoBO.ajax?cmd=doReceiptQuery";
				receiptManage.params.receiptType=3;
				var num =[8,9,13];//定义一个数组    
				receiptManage.params.repeictNumber=num;
				receiptManage.params.page=1;
				$timeout(function(){
					$scope.page.load({
								url:url,
								params:receiptManage.params,
								callBack:"$scope.selestData"
							});
					$scope.selestData=function(){
						setContentHegthDelay();
						receiptManage.params.endOrgName = $('#selectId option:selected').text();
						$scope.paramsExport = JSON.stringify(receiptManage.params);
				    };
					},500);
				},
			/**清空查询条件*/
			clear:function(){
				document.getElementById("beginTime").value='';
				document.getElementById("endTime").value='';
				receiptManage.query.descOrgId=-1;
				receiptManage.query.receiptNum='';
				receiptManage.query.trackingNum='';
				receiptManage.query.consignorBill='';
				receiptManage.query.consigneeBill='';
			},
			/**选择一行**/
			selectOne : function(orderId){
				if(document.getElementById("checkbox"+orderId).checked && document.getElementById("checkbox"+orderId) != undefined){
					document.getElementById("checkbox"+orderId).checked=false;
				}else{
					document.getElementById("checkbox"+orderId).checked=true;
				}
			},
			/**打印*/
			print:function(){
			},
			/***回单返厂**/
			receiptReturn:function(){
				var orderId='';
				var receiptPayment=0;
				var receiptNum=0;
				if($("input[name='check-1']:checked").length==0){
					commonService.alert("请至少选择一条信息!");
					return false;
				}
				if($("input[name='check-1']:checked").length>1){
					commonService.alert("只能选择一条信息!");
					return false;
				}
				$("input[name='check-1']:checked").each(function(){
					if($(this).val()!=null&&$(this).val()!=undefined&&$(this).val()!=''){
						var data=eval("("+$(this).val()+")");
						orderId=data.orderId;
						receiptPayment=data.receiptPayment/100;
						receiptNum=data.receiptNum;
						$scope.receiptStates=data.receiptState;
						
					}
				});
				if($scope.receiptStates!=13 && $scope.receiptStates!=8){
					commonService.alert("不是签单返回的数据不能进行回单返厂!");
					return;
				}
				var tips="";
				var sureText="";
				var cancer="";
				var isFlag=true;
				if(receiptPayment>0){
					tips="回单号"+receiptNum+",为回单付,需收取人民币"+receiptPayment+"元";
					sureText="确认已收取";
					cancer="暂不收取";
					isFlag=false;
				}else
				{
					tips="回单号"+receiptNum+",确认是否返厂";
				}
				var url = "orderInfoBO.ajax?cmd=receiptPalautus";
				commonService.confirm(tips,function(){
					var param = {"orderId":orderId,"isPay":1,"receiptStat":9};
					commonService.postUrl(url,param,function(data){
						//成功执行
						$scope.page.reLoad(-1);
						if(data!=null && data!=undefined && data!=""){
							    
								commonService.alert("操作成功!");
								//$scope.doQuery();
								
			 	    	}
					});
				},function(){
					if(!isFlag){
						var param = {"orderId":orderId,"isPay":2,"receiptStat":9};
						commonService.postUrl(url,param,function(data){
							//成功执行
							$scope.page.reLoad(-1);
							if(data!=null && data!=undefined && data!=""){
									commonService.alert("操作成功!");
									//$scope.doQuery();
									
							}
						});
					}
				},sureText,cancer);
			},
			/**取消回单返回**/
			delReturn:function(){
				if($("input[name='check-1']:checked").length==0){
					commonService.alert("请至少选择一条信息!");
					return false;
				}
				if($("input[name='check-1']:checked").length>1){
					commonService.alert("只能选择一条信息!");
					return false;
				}
				//var isFlag=true;
				var orderId="";
				$("input[name='check-1']:checked").each(function(){
					if($(this).val()!=null&&$(this).val()!=undefined&&$(this).val()!=''){
						var data=eval("("+$(this).val()+")");
						orderId=data.orderId;
						receiptNum=data.receiptNum;
						var num = new Array();
						if(data.receiptState != 9 || data.receiptState != "9"){
							commonService.alert("未返厂数据不允许取消!");
							return false;
						}
						num.push(orderId);
						commonService.confirm("确认取消回单返厂",function(){
							 var param={"orderId":num,"receiptState":13};
						     var url="orderInfoBO.ajax?cmd=delReceipt";
							commonService.postUrl(url,param,function(data){
								//成功执行
								$scope.page.reLoad(-1);
								if(data!=null && data!=undefined && data!=""){
										commonService.alert("操作成功!");
										//$scope.doQuery();
					 	    	}
							});
						},null);
					}
				});
			}
			
		};
	receiptManage.init();
}]);