package com.kayhandehghani.personalwebsite.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kayhandehghani.personalwebsite.data.entity.Image;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long>{

}
