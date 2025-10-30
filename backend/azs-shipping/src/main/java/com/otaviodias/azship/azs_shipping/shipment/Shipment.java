package com.otaviodias.azship.azs_shipping.shipment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shipment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String origin;
  private String destination;
  private Double weight;
  private Double volume;
  private Double cost;
}
