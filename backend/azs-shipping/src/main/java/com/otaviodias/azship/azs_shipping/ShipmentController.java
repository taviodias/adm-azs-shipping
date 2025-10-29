package com.otaviodias.azship.azs_shipping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ShipmentController {

  @GetMapping("/status")
  public String getStatus() {
    return "Azs Shipping Service is running!";
  }
}
