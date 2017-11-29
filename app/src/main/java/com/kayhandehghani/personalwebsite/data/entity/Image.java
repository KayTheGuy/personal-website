package com.kayhandehghani.personalwebsite.data.entity;

import java.sql.Date;

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
	@Column(name="image_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@Column(name="image_name")
	private String name;
	@Column(name="image_type")
	private String type;
	@Column(name="image_path")
	private String path;
	@Column(name="image_size")
	private long size;
	@Column(name="image_lat")
	private float lat;
	@Column(name="image_lng")
	private float lng;
	@Column(name="image_date")
	private Date date;
	
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
	public float getLat() {
		return lat;
	}
	public void setLat(int lat) {
		this.lat = lat;
	}
	public float getLng() {
		return lng;
	}
	public void setLng(int lng) {
		this.lng = lng;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
}
