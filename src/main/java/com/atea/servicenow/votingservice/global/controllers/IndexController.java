package com.atea.servicenow.votingservice.global.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
  @GetMapping("/")
  public String home() {
    return "index";
  }

  @GetMapping("/join/{id}")
  public String join() {
    return "index";
  }

  @GetMapping("/admin/{id}")
  public String admin() {
    return "index";
  }

  @GetMapping("/vote/{id}")
  public String vote() {
    return "index";
  }

}
