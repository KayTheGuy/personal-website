package com.kayhandehghani.personalwebsite.controllers;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kayhandehghani.personalwebsite.data.entity.ContactMessage;
import com.kayhandehghani.personalwebsite.data.entity.EmptyJsonResponse;
import com.kayhandehghani.personalwebsite.data.entity.Image;
import com.kayhandehghani.personalwebsite.data.repository.ImageRepository;
import com.kayhandehghani.personalwebsite.utilities.EmailUtility;
import com.kayhandehghani.personalwebsite.utilities.ImageUtility;

@RestController
public class FilesController {

	@PostMapping("/filter/{filterID}")
	public void editImage(@PathVariable(value="filterID") String id, @RequestParam("uploadedImg") MultipartFile file, HttpServletResponse response) throws IOException {
		String contentType = file.getContentType();
		String imgType = contentType.substring(contentType.indexOf("/") + 1).toUpperCase();
		if(imgType.equals("PNG") || imgType.equals("JPG") || imgType.equals("JPEG") || imgType.equals("JPEG-2000")) {
			BufferedImage orig = ImageIO.read(file.getInputStream());
			BufferedImage filtered = ImageUtility.applyFilter(orig, Integer.parseInt(id));
			ImageIO.write(filtered, imgType, Base64.getEncoder().wrap(response.getOutputStream())); // encode to base64 string
			response.setContentType(file.getContentType());
			response.setContentLengthLong(file.getSize());
			response.flushBuffer();
		} else { // report type error
			response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "Invalid image format!");
		}
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PostMapping("/message")
	public ResponseEntity getMessage(@RequestBody ContactMessage message) {
		try {
			EmailUtility.sendEmail(message.getName(), message.getSubject(), message.getEmail(), message.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
		} 
		
		return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.OK);
	}
	
	@Autowired
	ImageRepository repo;
	@RequestMapping(value = "/api/album", method = RequestMethod.GET)
	public List<Image> findAllImages() {
		List<Image> images = new ArrayList<>();
		Iterable<Image> results = repo.findAll();
		results.forEach(img -> images.add(img));
		return images;
	}
}
