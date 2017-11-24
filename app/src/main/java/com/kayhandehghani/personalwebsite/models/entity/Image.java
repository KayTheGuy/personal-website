package com.kayhandehghani.personalwebsite.models.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="IMAGE")
public class Image {
	@Id
	@Column(name="ImageID")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@Column(name="ImageName")
	private String name;
	@Column(name="ImageType")
	private String type;
	@Column(name="ImagePath")
	private String path;
	@Column(name="ImageSize")
	private long size;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
}
