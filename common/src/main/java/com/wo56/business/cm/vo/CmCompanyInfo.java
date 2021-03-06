package com.wo56.business.cm.vo;

// Generated 2016-6-18 10:56:55 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * 去掉 ，用这个去定义 SysTenantDef
 */
@Deprecated
public class CmCompanyInfo implements java.io.Serializable {

	private long tenantId;
	private String tenantCode;
	private String deptName;
	private String fullDeptName;
	private String deptQuickName;
	private Long provinceId;
	private String provinceName;
	private String cityName;
	private Long cityId;
	private String countyName;
	private String countyId;
	private String manager;
	private String managerphone;
	private String deptType;
	private String deptPhone;
	private String deptAddress;
	private String labelnName;
	private String shipDeptId;
	private String pickAddress;
	private String pickPhone;
	private String superId;
	private String remark;
	private byte state;
	private String modifier;
	private Date modifyDate;
	private float yjMoney;
	private float szMoney;
	private float ycMoney;
	private float dshkPounDage;
	private float dshkPounDageLow;
	private float dshkPounDageHigh;
	private float isWaitgivePounDage;
	private float srReceiptPounDage;
	private float swReceiptPounDage;
	private float inSuredmoneyPounDage;
	private Boolean isOperateCenter;
	private float operateWeiPrice;
	private float operateVolPrice;
	private String bankName;
	private String bankAccount;
	private String bankAddress;
	private String hubId;
	private String reportName;
	private Boolean isSetNbjs;
	private Byte deptAttribute;
	private Long dkwgtprice;
	private float dkvolprice;
	private float dkminprice;
	private float opMinprice;
	private Boolean isAutoNumber;
	private Boolean isLineJs;
	private Boolean isSenMsgOfSh;
	private Boolean isSenMsgOfFh;
	private Boolean isHeadquarters;
	private String defaultPassWord;
	private String prefix;
	private Boolean isNavigation;
	private String logoUrl;
	private Boolean isAudit;
	private String auditName;
	private Date auditDate;
	private String loginFileIndex;
	private String logFileIndex;
	private float frozenAccount;
	private Integer tkccycle;
	private Integer tkamount;
	private String smsAppId;
	private Byte isUseYw;
	private Date updateDate;

	public CmCompanyInfo() {
	}

	public CmCompanyInfo(byte state) {
		this.state = state;
	}

	public CmCompanyInfo(String tenantCode, String deptName,
			String fullDeptName, String deptQuickName, Long provinceId,

			String provinceName, String cityName, Long cityId,
			String countyName, String countyId, String manager,
			String managerphone, String deptType, String deptPhone,
			String deptAddress, String labelnName, String shipDeptId,
			String pickAddress, String pickPhone, String superId,
			String remark, byte state, String modifier, Date modifyDate,
			float yjMoney, float szMoney, float ycMoney, float dshkPounDage,
			float dshkPounDageLow, float dshkPounDageHigh,
			float isWaitgivePounDage, float srReceiptPounDage,
			float swReceiptPounDage, float inSuredmoneyPounDage,
			Boolean isOperateCenter, float operateWeiPrice,
			float operateVolPrice, String bankName, String bankAccount,
			String bankAddress, String hubId, String reportName,
			Boolean isSetNbjs, Byte deptAttribute, Long dkwgtprice,
			float dkvolprice, float dkminprice, float opMinprice,
			Boolean isAutoNumber, Boolean isLineJs, Boolean isSenMsgOfSh,
			Boolean isSenMsgOfFh, Boolean isHeadquarters,
			String defaultPassWord, String prefix, Boolean isNavigation,
			String logoUrl, Boolean isAudit, String auditName, Date auditDate,
			String loginFileIndex, String logFileIndex, float frozenAccount,
			Integer tkccycle, Integer tkamount, String smsAppId, Byte isUseYw,
			Date updateDate) {
		this.tenantCode = tenantCode;
		this.deptName = deptName;
		this.fullDeptName = fullDeptName;
		this.deptQuickName = deptQuickName;
		this.provinceId = provinceId;
		this.provinceName = provinceName;
		this.cityName = cityName;
		this.cityId = cityId;
		this.countyName = countyName;
		this.countyId = countyId;
		this.manager = manager;
		this.managerphone = managerphone;
		this.deptType = deptType;
		this.deptPhone = deptPhone;
		this.deptAddress = deptAddress;
		this.labelnName = labelnName;
		this.shipDeptId = shipDeptId;
		this.pickAddress = pickAddress;
		this.pickPhone = pickPhone;
		this.superId = superId;
		this.remark = remark;
		this.state = state;
		this.modifier = modifier;
		this.modifyDate = modifyDate;
		this.yjMoney = yjMoney;
		this.szMoney = szMoney;
		this.ycMoney = ycMoney;
		this.dshkPounDage = dshkPounDage;
		this.dshkPounDageLow = dshkPounDageLow;
		this.dshkPounDageHigh = dshkPounDageHigh;
		this.isWaitgivePounDage = isWaitgivePounDage;
		this.srReceiptPounDage = srReceiptPounDage;
		this.swReceiptPounDage = swReceiptPounDage;
		this.inSuredmoneyPounDage = inSuredmoneyPounDage;
		this.isOperateCenter = isOperateCenter;
		this.operateWeiPrice = operateWeiPrice;
		this.operateVolPrice = operateVolPrice;
		this.bankName = bankName;
		this.bankAccount = bankAccount;
		this.bankAddress = bankAddress;
		this.hubId = hubId;
		this.reportName = reportName;
		this.isSetNbjs = isSetNbjs;
		this.deptAttribute = deptAttribute;
		this.dkwgtprice = dkwgtprice;
		this.dkvolprice = dkvolprice;
		this.dkminprice = dkminprice;
		this.opMinprice = opMinprice;
		this.isAutoNumber = isAutoNumber;
		this.isLineJs = isLineJs;
		this.isSenMsgOfSh = isSenMsgOfSh;
		this.isSenMsgOfFh = isSenMsgOfFh;
		this.isHeadquarters = isHeadquarters;
		this.defaultPassWord = defaultPassWord;
		this.prefix = prefix;
		this.isNavigation = isNavigation;
		this.logoUrl = logoUrl;
		this.isAudit = isAudit;
		this.auditName = auditName;
		this.auditDate = auditDate;
		this.loginFileIndex = loginFileIndex;
		this.logFileIndex = logFileIndex;
		this.frozenAccount = frozenAccount;
		this.tkccycle = tkccycle;
		this.tkamount = tkamount;
		this.smsAppId = smsAppId;
		this.isUseYw = isUseYw;
		this.updateDate = updateDate;
	}

	public long getTenantId() {
		return this.tenantId;
	}

	public void setTenantId(long tenantId) {
		this.tenantId = tenantId;
	}

	public String getTenantCode() {
		return this.tenantCode;
	}

	public void setTenantCode(String tenantCode) {
		this.tenantCode = tenantCode;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getFullDeptName() {
		return this.fullDeptName;
	}

	public void setFullDeptName(String fullDeptName) {
		this.fullDeptName = fullDeptName;
	}

	public String getDeptQuickName() {
		return this.deptQuickName;
	}

	public void setDeptQuickName(String deptQuickName) {
		this.deptQuickName = deptQuickName;
	}

	public Long getProvinceId() {
		return this.provinceId;
	}

	public void setProvinceId(Long provinceId) {
		this.provinceId = provinceId;
	}

	public String getProvinceName() {
		return this.provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}


	public String getCityName() {
		return this.cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public Long getCityId() {
		return this.cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public String getCountyName() {
		return this.countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	public String getCountyId() {
		return this.countyId;
	}

	public void setCountyId(String countyId) {
		this.countyId = countyId;
	}

	public String getManager() {
		return this.manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getManagerphone() {
		return this.managerphone;
	}

	public void setManagerphone(String managerphone) {
		this.managerphone = managerphone;
	}

	public String getDeptType() {
		return this.deptType;
	}

	public void setDeptType(String deptType) {
		this.deptType = deptType;
	}

	public String getDeptPhone() {
		return this.deptPhone;
	}

	public void setDeptPhone(String deptPhone) {
		this.deptPhone = deptPhone;
	}

	public String getDeptAddress() {
		return this.deptAddress;
	}

	public void setDeptAddress(String deptAddress) {
		this.deptAddress = deptAddress;
	}

	public String getLabelnName() {
		return this.labelnName;
	}

	public void setLabelnName(String labelnName) {
		this.labelnName = labelnName;
	}

	public String getShipDeptId() {
		return this.shipDeptId;
	}

	public void setShipDeptId(String shipDeptId) {
		this.shipDeptId = shipDeptId;
	}

	public String getPickAddress() {
		return this.pickAddress;
	}

	public void setPickAddress(String pickAddress) {
		this.pickAddress = pickAddress;
	}

	public String getPickPhone() {
		return this.pickPhone;
	}

	public void setPickPhone(String pickPhone) {
		this.pickPhone = pickPhone;
	}

	public String getSuperId() {
		return this.superId;
	}

	public void setSuperId(String superId) {
		this.superId = superId;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public byte getState() {
		return this.state;
	}

	public void setState(byte state) {
		this.state = state;
	}

	public String getModifier() {
		return this.modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public float getYjMoney() {
		return this.yjMoney;
	}

	public void setYjMoney(float yjMoney) {
		this.yjMoney = yjMoney;
	}

	public float getSzMoney() {
		return this.szMoney;
	}

	public void setSzMoney(float szMoney) {
		this.szMoney = szMoney;
	}

	public float getYcMoney() {
		return this.ycMoney;
	}

	public void setYcMoney(float ycMoney) {
		this.ycMoney = ycMoney;
	}

	public float getDshkPounDage() {
		return this.dshkPounDage;
	}

	public void setDshkPounDage(float dshkPounDage) {
		this.dshkPounDage = dshkPounDage;
	}

	public float getDshkPounDageLow() {
		return this.dshkPounDageLow;
	}

	public void setDshkPounDageLow(float dshkPounDageLow) {
		this.dshkPounDageLow = dshkPounDageLow;
	}

	public float getDshkPounDageHigh() {
		return this.dshkPounDageHigh;
	}

	public void setDshkPounDageHigh(float dshkPounDageHigh) {
		this.dshkPounDageHigh = dshkPounDageHigh;
	}

	public float getIsWaitgivePounDage() {
		return this.isWaitgivePounDage;
	}

	public void setIsWaitgivePounDage(float isWaitgivePounDage) {
		this.isWaitgivePounDage = isWaitgivePounDage;
	}

	public float getSrReceiptPounDage() {
		return this.srReceiptPounDage;
	}

	public void setSrReceiptPounDage(float srReceiptPounDage) {
		this.srReceiptPounDage = srReceiptPounDage;
	}

	public float getSwReceiptPounDage() {
		return this.swReceiptPounDage;
	}

	public void setSwReceiptPounDage(float swReceiptPounDage) {
		this.swReceiptPounDage = swReceiptPounDage;
	}

	public float getInSuredmoneyPounDage() {
		return this.inSuredmoneyPounDage;
	}

	public void setInSuredmoneyPounDage(float inSuredmoneyPounDage) {
		this.inSuredmoneyPounDage = inSuredmoneyPounDage;
	}

	public Boolean getIsOperateCenter() {
		return this.isOperateCenter;
	}

	public void setIsOperateCenter(Boolean isOperateCenter) {
		this.isOperateCenter = isOperateCenter;
	}

	public float getOperateWeiPrice() {
		return this.operateWeiPrice;
	}

	public void setOperateWeiPrice(float operateWeiPrice) {
		this.operateWeiPrice = operateWeiPrice;
	}

	public float getOperateVolPrice() {
		return this.operateVolPrice;
	}

	public void setOperateVolPrice(float operateVolPrice) {
		this.operateVolPrice = operateVolPrice;
	}

	public String getBankName() {
		return this.bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankAccount() {
		return this.bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	public String getBankAddress() {
		return this.bankAddress;
	}

	public void setBankAddress(String bankAddress) {
		this.bankAddress = bankAddress;
	}

	public String getHubId() {
		return this.hubId;
	}

	public void setHubId(String hubId) {
		this.hubId = hubId;
	}

	public String getReportName() {
		return this.reportName;
	}

	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

	public Boolean getIsSetNbjs() {
		return this.isSetNbjs;
	}

	public void setIsSetNbjs(Boolean isSetNbjs) {
		this.isSetNbjs = isSetNbjs;
	}

	public Byte getDeptAttribute() {
		return this.deptAttribute;
	}

	public void setDeptAttribute(Byte deptAttribute) {
		this.deptAttribute = deptAttribute;
	}

	public Long getDkwgtprice() {
		return this.dkwgtprice;
	}

	public void setDkwgtprice(Long dkwgtprice) {
		this.dkwgtprice = dkwgtprice;
	}

	public float getDkvolprice() {
		return this.dkvolprice;
	}

	public void setDkvolprice(float dkvolprice) {
		this.dkvolprice = dkvolprice;
	}

	public float getDkminprice() {
		return this.dkminprice;
	}

	public void setDkminprice(float dkminprice) {
		this.dkminprice = dkminprice;
	}

	public float getOpMinprice() {
		return this.opMinprice;
	}

	public void setOpMinprice(float opMinprice) {
		this.opMinprice = opMinprice;
	}

	public Boolean getIsAutoNumber() {
		return this.isAutoNumber;
	}

	public void setIsAutoNumber(Boolean isAutoNumber) {
		this.isAutoNumber = isAutoNumber;
	}

	public Boolean getIsLineJs() {
		return this.isLineJs;
	}

	public void setIsLineJs(Boolean isLineJs) {
		this.isLineJs = isLineJs;
	}

	public Boolean getIsSenMsgOfSh() {
		return this.isSenMsgOfSh;
	}

	public void setIsSenMsgOfSh(Boolean isSenMsgOfSh) {
		this.isSenMsgOfSh = isSenMsgOfSh;
	}

	public Boolean getIsSenMsgOfFh() {
		return this.isSenMsgOfFh;
	}

	public void setIsSenMsgOfFh(Boolean isSenMsgOfFh) {
		this.isSenMsgOfFh = isSenMsgOfFh;
	}

	public Boolean getIsHeadquarters() {
		return this.isHeadquarters;
	}

	public void setIsHeadquarters(Boolean isHeadquarters) {
		this.isHeadquarters = isHeadquarters;
	}

	public String getDefaultPassWord() {
		return this.defaultPassWord;
	}

	public void setDefaultPassWord(String defaultPassWord) {
		this.defaultPassWord = defaultPassWord;
	}

	public String getPrefix() {
		return this.prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public Boolean getIsNavigation() {
		return this.isNavigation;
	}

	public void setIsNavigation(Boolean isNavigation) {
		this.isNavigation = isNavigation;
	}

	public String getLogoUrl() {
		return this.logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public Boolean getIsAudit() {
		return this.isAudit;
	}

	public void setIsAudit(Boolean isAudit) {
		this.isAudit = isAudit;
	}

	public String getAuditName() {
		return this.auditName;
	}

	public void setAuditName(String auditName) {
		this.auditName = auditName;
	}

	public Date getAuditDate() {
		return this.auditDate;
	}

	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
	}

	public String getLoginFileIndex() {
		return this.loginFileIndex;
	}

	public void setLoginFileIndex(String loginFileIndex) {
		this.loginFileIndex = loginFileIndex;
	}

	public String getLogFileIndex() {
		return this.logFileIndex;
	}

	public void setLogFileIndex(String logFileIndex) {
		this.logFileIndex = logFileIndex;
	}

	public float getFrozenAccount() {
		return this.frozenAccount;
	}

	public void setFrozenAccount(float frozenAccount) {
		this.frozenAccount = frozenAccount;
	}

	public Integer getTkccycle() {
		return this.tkccycle;
	}

	public void setTkccycle(Integer tkccycle) {
		this.tkccycle = tkccycle;
	}

	public Integer getTkamount() {
		return this.tkamount;
	}

	public void setTkamount(Integer tkamount) {
		this.tkamount = tkamount;
	}

	public String getSmsAppId() {
		return this.smsAppId;
	}

	public void setSmsAppId(String smsAppId) {
		this.smsAppId = smsAppId;
	}

	public Byte getIsUseYw() {
		return this.isUseYw;
	}

	public void setIsUseYw(Byte isUseYw) {
		this.isUseYw = isUseYw;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

}
