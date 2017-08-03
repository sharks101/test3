package com.wo56.business.cm.vo;

// Generated 2016-3-15 16:26:20 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.framework.core.util.SysStaticDataUtil;
import com.wo56.common.utils.OraganizationCacheDataUtil;

/**
 * CmVehicleInfo generated by hbm2java
 */
public class CmVehicleInfo implements java.io.Serializable {

	private long vehicleId;
	private String plateNumber;
	private String orgId;
	private long tenantId;
	private long currentOrgId;
	private int type;
	private Long mainDriverId;
	private Long secondDriverId;
	private String mainDriverName;
	private String secondDriverName;
	private Double length;
	private Double wide;
	private Double high;
	private Double volume;
	private Double actualVolume;
	private Double actualWeight;
	private int status;
	private Integer vehicleType;
	private Date registDate;
	private Date pullDate;
	private String systemType;
	private int businessType;
	private String contractNo;
	private Date createDate;
	private long opId;
	private String vehicleTypeName;
	private Integer vehicleState;
	private String vehicleStateName;

	private String businessName;
	private String orgName;
	private String mainDriverPhone;
	private String engineNo;
	private String frameNo;
	private String drivingPic;
	private String opName;
	private Long creatorId;
	private String creatorName;
	


	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getOpName() {
		return opName;
	}

	public void setOpName(String opName) {
		this.opName = opName;
	}

	public String getEngineNo() {
		return engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	public String getFrameNo() {
		return frameNo;
	}

	public void setFrameNo(String frameNo) {
		this.frameNo = frameNo;
	}

	public String getDrivingPic() {
		return drivingPic;
	}

	public void setDrivingPic(String drivingPic) {
		this.drivingPic = drivingPic;
	}

	public String getMainDriverPhone() {
		return mainDriverPhone;
	}

	public void setMainDriverPhone(String mainDriverPhone) {
		this.mainDriverPhone = mainDriverPhone;
	}

	public String getVehicleStateName() {
		if(vehicleState>0){
			setVehicleStateName(SysStaticDataUtil.getSysStaticData("VEH_STATE", vehicleState+"").getCodeName());
		}
		return vehicleStateName;
	}

	public void setVehicleStateName(String vehicleStateName) {
		this.vehicleStateName = vehicleStateName;
	}

	public Integer getVehicleState() {
		return vehicleState;
	}

	public void setVehicleState(Integer vehicleState) {
		this.vehicleState = vehicleState;
	}

	public String getVehicleTypeName() {
		if(vehicleType>0){
			setVehicleTypeName(SysStaticDataUtil.getSysStaticData("VEHICLE_TYPE", vehicleType+"").getCodeName());
		}
		return vehicleTypeName;
	}

	public void setVehicleTypeName(String vehicleTypeName) {
		this.vehicleTypeName = vehicleTypeName;
	}

	public long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(long vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getPlateNumber() {
		return plateNumber;
	}

	public void setPlateNumber(String plateNumber) {
		this.plateNumber = plateNumber;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public long getTenantId() {
		return tenantId;
	}

	public void setTenantId(long tenantId) {
		this.tenantId = tenantId;
	}

	public long getCurrentOrgId() {
		return currentOrgId;
	}

	public void setCurrentOrgId(long currentOrgId) {
		this.currentOrgId = currentOrgId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Long getMainDriverId() {
		return mainDriverId;
	}

	public void setMainDriverId(Long mainDriverId) {
		this.mainDriverId = mainDriverId;
	}

	public Long getSecondDriverId() {
		return secondDriverId;
	}

	public void setSecondDriverId(Long secondDriverId) {
		this.secondDriverId = secondDriverId;
	}

	public Double getLength() {
		return length;
	}

	public void setLength(Double length) {
		this.length = length;
	}

	public Double getWide() {
		return wide;
	}

	public void setWide(Double wide) {
		this.wide = wide;
	}

	public Double getHigh() {
		return high;
	}

	public void setHigh(Double high) {
		this.high = high;
	}

	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	 

	public Double getActualVolume() {
		return actualVolume;
	}

	public void setActualVolume(Double actualVolume) {
		this.actualVolume = actualVolume;
	}

	public Double getActualWeight() {
		return actualWeight;
	}

	public void setActualWeight(Double actualWeight) {
		this.actualWeight = actualWeight;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Integer getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(Integer vehicleType) {
		this.vehicleType = vehicleType;
	}

	public Date getRegistDate() {
		return registDate;
	}

	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}

	public Date getPullDate() {
		return pullDate;
	}

	public void setPullDate(Date pullDate) {
		this.pullDate = pullDate;
	}

	public String getSystemType() {
		return systemType;
	}

	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}

	public int getBusinessType() {
		return businessType;
	}

	public void setBusinessType(int businessType) {
		this.businessType = businessType;
	}

	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public long getOpId() {
		return opId;
	}

	public void setOpId(long opId) {
		this.opId = opId;
	}

	public String getBusinessName() {
		if(businessType>0){
			setBusinessName(SysStaticDataUtil.getSysStaticData("BUSINESS_TYPE", businessType+"").getCodeName());
		}
		
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}
	public String getOrgName() {
		if(StringUtils.isNotEmpty(orgId)){
			setOrgName(OraganizationCacheDataUtil.getOrgName(Long.valueOf(orgId)));
		}
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getMainDriverName() {
		return mainDriverName;
	}

	public void setMainDriverName(String mainDriverName) {
		this.mainDriverName = mainDriverName;
	}

	public String getSecondDriverName() {
		return secondDriverName;
	}

	public void setSecondDriverName(String secondDriverName) {
		this.secondDriverName = secondDriverName;
	}

}

