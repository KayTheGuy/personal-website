package com.kayhandehghani.personalwebsite.utilities;

import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.google.common.collect.Lists;
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
		List<Long> followings = Lists.newArrayList(1234L, 566788L);
		List<String> terms = Lists.newArrayList("twitter", "api");
		hosebirdEndpoint.followings(followings);
		hosebirdEndpoint.trackTerms(terms);

		Authentication hosebirdAuth = new OAuth1(twitterConfig.get("consumerKey"), twitterConfig.get("consumerSecret"), 
				twitterConfig.get("token"), twitterConfig.get("tokenSecret"));
		ClientBuilder builder = new ClientBuilder()
				  .name("Hosebird-Client-01")                              // mainly for the logs
				  .hosts(hosebirdHosts)
				  .authentication(hosebirdAuth)
				  .endpoint(hosebirdEndpoint)
				  .processor(new StringDelimitedProcessor(msgQueue))
				  .eventMessageQueue(eventQueue);                          // to process client events

		Client hosebirdClient = builder.build();
		hosebirdClient.connect();
		System.out.println(hosebirdClient.getStatsTracker().toString());
	}
}
