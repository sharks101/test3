package com.wo56.business.ord.vo;

// Generated 2016-3-15 16:26:20 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

import com.framework.core.base.POJO;
import com.framework.core.util.SysStaticDataUtil;
import com.wo56.common.utils.OraganizationCacheDataUtil;

/**
 * OrdDepartInfo generated by hbm2java
 */
public class OrdDepartInfo extends POJO implements java.io.Serializable {

	private long batchNum;
	private long sourceOrgId;
	private long descOrgId;
	private String plateNumber;
	private Long driverId;
	private String driverName;
	private String driverBill;
	private String loader;
	private Long loaderId;
	private int state;
	private Long vehicleId;
	private String stateName;
	private int orderNum;
	private double volume;
	private double weight;
	private Long freight;
	private String sourceOrgIdName;
	private String descOrgIdName;
	private Long freightPayDot;
	private Integer payState;
	private Long stevedoring;
	private Long stevedoringPayDot;
	private Integer stevedoringPayState;
	private String remarks;
	private Long loadOpId;
	private String loadOpName;
	private Date loadTime;
	private Long departOpId;
	private String departOpName;
	private Date departTime;
	private Long arrivalVehOpId;
	private String arrivalVehOpName;
	private Date arrivalVehTime;
	private Long arrivalOpId;
	private String arrivalOpName;
	private Date arrivalTime;
	private String transportContract;
	private String batchNumAlias;
	private Integer number;
	private Long totalFee;
	private Long collectMoney;
	
	
	public Long getTotalFee() {
		return totalFee;
	}

	public void setTotalFee(Long totalFee) {
		this.totalFee = totalFee;
	}

	public Long getCollectMoney() {
		return collectMoney;
	}

	public void setCollectMoney(Long collectMoney) {
		this.collectMoney = collectMoney;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getBatchNumAlias() {
		return batchNumAlias;
	}

	public void setBatchNumAlias(String batchNumAlias) {
		this.batchNumAlias = batchNumAlias;
	}
	private int isShort;
	
	public int getIsShort() {
		return isShort;
	}

	public void setIsShort(int isShort) {
		this.isShort = isShort;
	}

	public String getTransportContract() {
		return transportContract;
	}

	public void setTransportContract(String transportContract) {
		this.transportContract = transportContract;
	}

	public Long getLoadOpId() {
		return loadOpId;
	}

	public void setLoadOpId(Long loadOpId) {
		this.loadOpId = loadOpId;
	}

	public String getLoadOpName() {
		return loadOpName;
	}

	public void setLoadOpName(String loadOpName) {
		this.loadOpName = loadOpName;
	}

	public Long getDepartOpId() {
		return departOpId;
	}

	public void setDepartOpId(Long departOpId) {
		this.departOpId = departOpId;
	}

	public String getDepartOpName() {
		return departOpName;
	}

	public void setDepartOpName(String departOpName) {
		this.departOpName = departOpName;
	}

	public Long getArrivalVehOpId() {
		return arrivalVehOpId;
	}

	public void setArrivalVehOpId(Long arrivalVehOpId) {
		this.arrivalVehOpId = arrivalVehOpId;
	}

	public String getArrivalVehOpName() {
		return arrivalVehOpName;
	}

	public void setArrivalVehOpName(String arrivalVehOpName) {
		this.arrivalVehOpName = arrivalVehOpName;
	}

	public Date getArrivalVehTime() {
		return arrivalVehTime;
	}

	public void setArrivalVehTime(Date arrivalVehTime) {
		this.arrivalVehTime = arrivalVehTime;
	}

	public Long getArrivalOpId() {
		return arrivalOpId;
	}

	public void setArrivalOpId(Long arrivalOpId) {
		this.arrivalOpId = arrivalOpId;
	}

	public String getArrivalOpName() {
		return arrivalOpName;
	}

	public void setArrivalOpName(String arrivalOpName) {
		this.arrivalOpName = arrivalOpName;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getFreightPayDot() {
		return freightPayDot;
	}

	public void setFreightPayDot(Long freightPayDot) {
		this.freightPayDot = freightPayDot;
	}

	public Integer getPayState() {
		return payState;
	}

	public void setPayState(Integer payState) {
		this.payState = payState;
	}

	public Long getStevedoring() {
		return stevedoring;
	}

	public void setStevedoring(Long stevedoring) {
		this.stevedoring = stevedoring;
	}

	public Long getStevedoringPayDot() {
		return stevedoringPayDot;
	}

	public void setStevedoringPayDot(Long stevedoringPayDot) {
		this.stevedoringPayDot = stevedoringPayDot;
	}

	public Integer getStevedoringPayState() {
		return stevedoringPayState;
	}

	public void setStevedoringPayState(Integer stevedoringPayState) {
		this.stevedoringPayState = stevedoringPayState;
	}

	public String getSourceOrgIdName() {
		if(sourceOrgId>0){
			setSourceOrgIdName(OraganizationCacheDataUtil.getOrgName(sourceOrgId));
		}
		return sourceOrgIdName;
	}

	public void setSourceOrgIdName(String sourceOrgIdName) {
		this.sourceOrgIdName = sourceOrgIdName;
	}

	public String getDescOrgIdName() {
		if(descOrgId>0){
			setDescOrgIdName(OraganizationCacheDataUtil.getOrgName(descOrgId));
		}
		return descOrgIdName;
	}

	public void setDescOrgIdName(String descOrgIdName) {
		this.descOrgIdName = descOrgIdName;
	}

	public Long getFreight() {
		return freight;
	}

	public void setFreight(Long freight) {
		this.freight = freight;
	}

	public int getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}

	public double getVolume() {
		return volume;
	}

	public void setVolume(double volume) {
		this.volume = volume;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getStateName() {
		if(state>0){
			setStateName(SysStaticDataUtil.getSysStaticData("VEHICLE_STATE", state+"").getCodeName());
		}
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public OrdDepartInfo() {
	}

	public OrdDepartInfo(long batchNum, long sourceOrgId, long descOrgId,
			Date loadTime, Date departTime, Date arrivalTime,
			String plateNumber, long driverId, String driverName,
			String driverBill, String loader, long loaderId, int state,
			long vehicleId) {
		this.batchNum = batchNum;
		this.sourceOrgId = sourceOrgId;
		this.descOrgId = descOrgId;
		this.loadTime = loadTime;
		this.departTime = departTime;
		this.arrivalTime = arrivalTime;
		this.plateNumber = plateNumber;
		this.driverId = driverId;
		this.driverName = driverName;
		this.driverBill = driverBill;
		this.loader = loader;
		this.loaderId = loaderId;
		this.state = state;
		this.vehicleId = vehicleId;
	}

	public long getBatchNum() {
		return this.batchNum;
	}

	public void setBatchNum(long batchNum) {
		this.batchNum = batchNum;
	}

	public long getSourceOrgId() {
		return this.sourceOrgId;
	}

	public void setSourceOrgId(long sourceOrgId) {
		this.sourceOrgId = sourceOrgId;
	}

	public long getDescOrgId() {
		return this.descOrgId;
	}

	public void setDescOrgId(long descOrgId) {
		this.descOrgId = descOrgId;
	}

	public Date getLoadTime() {
		return this.loadTime;
	}

	public void setLoadTime(Date loadTime) {
		this.loadTime = loadTime;
	}

	public Date getDepartTime() {
		return this.departTime;
	}

	public void setDepartTime(Date departTime) {
		this.departTime = departTime;
	}

	public Date getArrivalTime() {
		return this.arrivalTime;
	}

	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getPlateNumber() {
		return this.plateNumber;
	}

	public void setPlateNumber(String plateNumber) {
		this.plateNumber = plateNumber;
	}

	public Long getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}

	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	public String getDriverBill() {
		return this.driverBill;
	}

	public void setDriverBill(String driverBill) {
		this.driverBill = driverBill;
	}

	public String getLoader() {
		return this.loader;
	}

	public void setLoader(String loader) {
		this.loader = loader;
	}

	public Long getLoaderId() {
		return this.loaderId;
	}

	public void setLoaderId(Long loaderId) {
		this.loaderId = loaderId;
	}

	public int getState() {
		return this.state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public Long getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}

}
