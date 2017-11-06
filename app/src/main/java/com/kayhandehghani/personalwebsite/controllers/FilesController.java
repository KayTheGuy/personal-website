package com.kayhandehghani.personalwebsite.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FilesController {

	@RequestMapping(value = "/download/resume", method = RequestMethod.GET)
	public void getResume(HttpServletResponse response) throws IOException {
		String s = File.separator;
		String pdfRelativePath =  ".." + s + ".." + s + ".." + s + ".." + s
				+ "static" + s + "files" + s + "KayhanDehghani.pdf";
		String currentPath = FilesController.class.getResource("").getPath();
		Path pdfPath = Paths.get(currentPath + pdfRelativePath);
		InputStream is = Files.newInputStream(pdfPath);
		
		response.addHeader("Content-disposition", "attachment;KayhanDehghani.pdf");
		response.setContentType("application/pdf");

		// Copy the stream to the response's output stream
		IOUtils.copy(is, response.getOutputStream());
		response.flushBuffer();
	}
	
	@PostMapping("/upload/image")
	public void editImage(@RequestParam("uploadedImg") MultipartFile file, HttpServletResponse response) throws IOException {
//		InputStream is = request.getInputStream();
		System.out.println(file.getName());
		System.out.println(file.getSize());
//		System.out.println(is.);
	}
		
}
