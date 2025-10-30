package com.otaviodias.azship.azs_shipping.shipment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
  @Query("SELECT s FROM Shipment s WHERE " +
           "s.origin LIKE %:filter% OR " +
           "s.destination LIKE %:filter% OR " +
           "str(s.weight) LIKE %:filter% OR " +
           "str(s.volume) LIKE %:filter% OR " +
           "str(s.cost) LIKE %:filter% OR " +
           "str(s.id) LIKE %:filter%")
    Page<Shipment> findWithFilter(@Param("filter") String filter, Pageable pageable);
}
