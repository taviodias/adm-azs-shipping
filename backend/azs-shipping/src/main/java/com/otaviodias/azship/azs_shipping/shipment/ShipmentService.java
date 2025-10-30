package com.otaviodias.azship.azs_shipping.shipment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ShipmentService {
  @Autowired
    private ShipmentRepository shipmentRepository;

    public Page<Shipment> fetchAll(String filter, Pageable pageable) {
        
        // Se o filtro for nulo ou vazio, busca tudo paginado
        if (filter == null || filter.trim().isEmpty()) {
            return shipmentRepository.findAll(pageable);
        }
        
        // Se houver um filtro, chama nossa query customizada
        return shipmentRepository.findWithFilter(filter, pageable);
    }
}
