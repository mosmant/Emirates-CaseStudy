package com.example.apigateway.controller;

import com.example.apigateway.service.AppGatewayService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/apps")
public class AppGatewayController {

    private final AppGatewayService service;

    public AppGatewayController(AppGatewayService service) {
        this.service = service;
    }

    @GetMapping("/search")
    public Mono<String> search(@RequestParam String keyword) {
        return service.search(keyword);
    }
}
