package com.kayhandehghani.personalwebsite.utilities;

import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.event.Event;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;

public class TwitterUtility {
	
	public static void setup() {
		CongifUtility config = CongifUtility.getInstance();
		Map<String, String> twitterConfig = config.getTwitterConfigs();
		
		BlockingQueue<String> msgQueue = new LinkedBlockingQueue<String>(100000);
		BlockingQueue<Event> eventQueue = new LinkedBlockingQueue<Event>(1000);

		Hosts hosebirdHosts = new HttpHosts(Constants.STREAM_HOST);
		StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();

		Authentication hosebirdAuth = new OAuth1(twitterConfig.get("consumerKey"), twitterConfig.get("consumerSecret"), 
				twitterConfig.get("token"), twitterConfig.get("tokenSecret"));
		ClientBuilder builder = new ClientBuilder()
				  .hosts(hosebirdHosts)
				  .authentication(hosebirdAuth)
				  .endpoint(hosebirdEndpoint)
				  .processor(new StringDelimitedProcessor(msgQueue))
				  .eventMessageQueue(eventQueue);                          // if you want to process client events

		Client hosebirdClient = builder.build();
		hosebirdClient.connect();
	}
}
