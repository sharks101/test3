package com.wo56.business.cm.vo;

// Generated 2016-6-4 13:56:56 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * CmExceptionInfo generated by hbm2java
 */
public class CmExceptionInfo implements java.io.Serializable {

	private long id;
	private String exceptionCode;
	private String exceptionName;
	private Integer state;
	private String tenantCode;
	private Long tanentId;
	private Long opId;
	private Date opDate;

	public CmExceptionInfo() {
	}

	public CmExceptionInfo(Date opDate) {
		this.opDate = opDate;
	}

	public CmExceptionInfo(String exceptionCode, String exceptionName,
			Integer state, String tenantCode, Long tanentId, Long opId,
			Date opDate) {
		this.exceptionCode = exceptionCode;
		this.exceptionName = exceptionName;
		this.state = state;
		this.tenantCode = tenantCode;
		this.tanentId = tanentId;
		this.opId = opId;
		this.opDate = opDate;
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getExceptionCode() {
		return this.exceptionCode;
	}

	public void setExceptionCode(String exceptionCode) {
		this.exceptionCode = exceptionCode;
	}

	public String getExceptionName() {
		return this.exceptionName;
	}

	public void setExceptionName(String exceptionName) {
		this.exceptionName = exceptionName;
	}

	public Integer getState() {
		return this.state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getTenantCode() {
		return this.tenantCode;
	}

	public void setTenantCode(String tenantCode) {
		this.tenantCode = tenantCode;
	}

	public Long getTanentId() {
		return this.tanentId;
	}

	public void setTanentId(Long tanentId) {
		this.tanentId = tanentId;
	}

	public Long getOpId() {
		return this.opId;
	}

	public void setOpId(Long opId) {
		this.opId = opId;
	}

	public Date getOpDate() {
		return this.opDate;
	}

	public void setOpDate(Date opDate) {
		this.opDate = opDate;
	}

}