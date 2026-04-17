package com.anderson.infrografiaweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping({"/index-zawarudo", "/zawarudo", "/zawa"})
    public String indexZawarudo() {
        return "index-zawarudo";
    }
}
