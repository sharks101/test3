package com.wo56.business.ord.vo.in;

import com.framework.core.svcaller.interfaces.IParamIn;
import com.framework.core.svcaller.vo.PageInParamVO;
import com.wo56.common.consts.InterFacesCodeConsts;

public class OrdDoQueryOtherIn extends PageInParamVO implements IParamIn{

	private static final long serialVersionUID = -3107996056975599605L;
	@Override
	public String getInCode() {
		return InterFacesCodeConsts.ORD.ORD_DO_QUERY_OTHER;
	}
	/**开始时间（0）**/
	private String beginTime;
	/**结束时间（0）**/
	private String endTime;
	/**批次号（0）*/
	private long batchNum;
	/**收货人*/
	private String consigneeBill;
	/**发货人*/
	private String consignorBill;
	/**d订单id*/
	private long orderId;
	/**订单状态*/
	private Integer orderState;
	/**运单号**/
	private Long trackingNum;
	/**回单号**/
	private String receiptNum;
	/***目的网点*/
	private String descOrgId;
	private String type; //送货类型 1:普通送货上门 2:中转送货上门
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getDescOrgId() {
		return descOrgId;
	}
	public void setDescOrgId(String descOrgId) {
		this.descOrgId = descOrgId;
	}
	public String getReceiptNum() {
		return receiptNum;
	}
	public void setReceiptNum(String receiptNum) {
		this.receiptNum = receiptNum;
	}
	public Long getTrackingNum() {
		return trackingNum;
	}
	public void setTrackingNum(Long trackingNum) {
		this.trackingNum = trackingNum;
	}
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public long getBatchNum() {
		return batchNum;
	}
	public void setBatchNum(long batchNum) {
		this.batchNum = batchNum;
	}
	public String getConsigneeBill() {
		return consigneeBill;
	}
	public void setConsigneeBill(String consigneeBill) {
		this.consigneeBill = consigneeBill;
	}
	public String getConsignorBill() {
		return consignorBill;
	}
	public void setConsignorBill(String consignorBill) {
		this.consignorBill = consignorBill;
	}
	public long getOrderId() {
		return orderId;
	}
	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}
	public Integer getOrderState() {
		return orderState;
	}
	public void setOrderState(Integer orderState) {
		this.orderState = orderState;
	}
	
	
}
