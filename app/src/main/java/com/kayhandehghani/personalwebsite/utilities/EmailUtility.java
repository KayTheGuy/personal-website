package com.kayhandehghani.personalwebsite.utilities;

import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailUtility {
	static Properties properties;
	static Session session;
	static MimeMessage message;
	
	public static void sendEmail(String name, String subject, String email, String messageBody) throws AddressException, MessagingException {
		CongifUtility config = CongifUtility.getInstance();
		Map<String, String> gmailConfig = config.getGmailConfigs();
		
		properties = System.getProperties();
		properties.put("mail.smtp.port", "587");
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
 
		session = Session.getDefaultInstance(properties, null);
		message = new MimeMessage(session);
		message.addRecipient(Message.RecipientType.TO, new InternetAddress(gmailConfig.get("receiver")));
		message.setSubject("New message sent from your website!");
		String emailBody = "Name: <br><br> " + name + "<br><br> Subject: <br><br> " + subject + "<br><br> Email: <br><br> " + email + "<br><br> Message: <br><br> " + messageBody + "<br><br>";
		message.setContent(emailBody, "text/html");
 
		Transport transport = session.getTransport("smtp");
 
		transport.connect("smtp.gmail.com", gmailConfig.get("user"), gmailConfig.get("password"));
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}
}
