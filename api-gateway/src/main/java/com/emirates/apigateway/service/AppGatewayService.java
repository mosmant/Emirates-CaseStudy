package com.example.apigateway.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AppGatewayService {

    private final WebClient.Builder webClientBuilder;

    @Value("${node.service.url}")
    private String nodeServiceUrl;

    public AppGatewayService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public Mono<String> search(String keyword) {
        return webClientBuilder.build()
                .get()
                .uri(nodeServiceUrl + "/data?keyword=" + keyword)
                .retrieve()
                .bodyToMono(String.class);
    }
}
