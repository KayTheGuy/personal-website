package com.kayhandehghani.personalwebsite.utilities;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class CongifUtility {
	private static CongifUtility instance;
	private static JSONObject mainJson;
	private static JSONParser parser;
	
	private CongifUtility() {
		this.setup();
	}
	
	public static CongifUtility getInstance() {
		if(instance == null) {
			instance = new CongifUtility();
		}
		return instance;
	}
	
	private void setup() {
		parser = new JSONParser();
		
		try {
			FileReader fileReader = new FileReader("config.json"); 
			mainJson = (JSONObject) parser.parse(fileReader);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
	
	public Map<String, String> getGmailConfigs() {
		Map<String, String> map = new HashMap<>();
		if(mainJson != null) {
			JSONObject twitterJson = (JSONObject) mainJson.get("Gmail");
			map.put("user", (String) twitterJson.get("user"));
			map.put("password", (String) twitterJson.get("password"));
			map.put("receiver", (String) twitterJson.get("receiver"));
		}
		return map;
	}
	
}
