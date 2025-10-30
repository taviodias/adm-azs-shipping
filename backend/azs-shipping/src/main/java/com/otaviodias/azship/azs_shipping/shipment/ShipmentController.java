package com.otaviodias.azship.azs_shipping.shipment;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ShipmentController {

  private final ShipmentRepository shipmentRepository;
  private final ShipmentService shipmentService;

  @GetMapping("/status")
  public String getStatus() {
    return "Azs Shipping Service is running!";
  }

  @GetMapping("/shipment")
  public Page<Shipment> getShipments(@PathParam("page") Integer page, @PathParam("limit") Integer limit, @PathParam("filter") String filter) {
    Pageable pageable = Pageable.ofSize(limit).withPage(page - 1);
    Page<Shipment> shipments = shipmentService.fetchAll(filter, pageable);
    return shipments;
  }

  @PostMapping("/shipment")
  public ResponseEntity<Object> creteShipment(@RequestBody Shipment newShipment) {
    if (newShipment.getWeight() == null && newShipment.getVolume() == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fields weight or volume must not be null.");
    }
    if (newShipment.getCost() == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Field cost must not be null.");
    }
    shipmentRepository.save(newShipment);
    return ResponseEntity.status(HttpStatus.CREATED).body(newShipment);
  }

  @PutMapping("/shipment/{id}")
  public ResponseEntity<Object> updateShipment(@PathVariable Long id, @RequestBody Shipment newShipment) {
    if(!shipmentRepository.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Shipment with id " + id + " not found.");
    }
    if(newShipment == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request body must not be null.");
    }
    Shipment shipmentToUpdate = shipmentRepository.findById(id).get();
    if(newShipment.getOrigin() != null) {
      shipmentToUpdate.setOrigin(newShipment.getOrigin());
    }
    if(newShipment.getDestination() != null) {
      shipmentToUpdate.setDestination(newShipment.getDestination());
    }
    if(newShipment.getWeight() != null) {
      shipmentToUpdate.setWeight(newShipment.getWeight());
    }
    if(newShipment.getVolume() != null) {
      shipmentToUpdate.setVolume(newShipment.getVolume());
    }
    if(newShipment.getCost() != null) {
      shipmentToUpdate.setCost(newShipment.getCost());
    }
    shipmentRepository.save(shipmentToUpdate);
    return ResponseEntity.status(HttpStatus.OK).body(shipmentToUpdate);
  }

  @DeleteMapping("/shipment/{id}")
  public ResponseEntity<Object> deleteShipment(@PathVariable Long id) {
    if (!shipmentRepository.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Shipment with id " + id + " not found.");
    }
    shipmentRepository.deleteById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

}
