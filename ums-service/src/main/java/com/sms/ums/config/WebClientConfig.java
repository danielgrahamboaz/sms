package com.sms.ums.config;

import com.sms.ums.clients.CourseClient;
import com.sms.ums.clients.GradeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {

    @Autowired
    private LoadBalancedExchangeFilterFunction filterFunction;

    @Bean
    public WebClient gradeWebClient() {
        return WebClient.builder()
                .baseUrl("http://cms-service:7070")
                .filter(filterFunction)
                .build();
    }

//    http proxy for interservice exchange
    @Bean
    public GradeClient gradeClient() {
        HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(gradeWebClient())).build();

        return httpServiceProxyFactory.createClient(GradeClient.class);
    }

    @Bean
    public CourseClient courseClient() {
        HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(gradeWebClient())).build();

        return httpServiceProxyFactory.createClient(CourseClient.class);
    }

}
