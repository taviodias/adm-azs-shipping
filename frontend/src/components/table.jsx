import { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { EditShipmentModal } from './editShipmentModal';
import { DeleteConfirmationModal } from './deleteShipmentModal';

export function Table({ shipments, fetchShipments, setPage }) {
  const [editingShipment, setEditingShipment] = useState(null);
  const [deletingShipment, setDeletingShipment] = useState(null);

  const handleConfirmDelete = async () => {
    if (!deletingShipment) return;

    try {
      const response = await fetch(`http://localhost:8080/shipment/${deletingShipment.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir a remessa.');
      }
      setDeletingShipment(null);
    } catch (error) {
      console.error('Erro ao excluir a remessa:', error);
    }
    setPage(1);
    fetchShipments();
  };

  const handleCloseModal = () => {
    fetchShipments();
    setEditingShipment(null);
  };

  const handleEditClick = (shipment) => {
    setEditingShipment(shipment);
  };

  const handleDeleteClick = (shipment) => {
    setDeletingShipment(shipment);
  };

  const handleCloseDeleteModal = () => {
    setDeletingShipment(null);
  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">Origem</th>
            <th scope="col" className="px-6 py-3">Destino</th>
            <th scope="col" className="px-6 py-3">Peso</th>
            <th scope="col" className="px-6 py-3">Volume</th>
            <th scope="col" className="px-6 py-3">Custo</th>
            <th scope="col" className="px-6 py-3 text-center w-20">Ações</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(shipment => (
            <tr key={shipment.id} className="odd:bg-white even:bg-gray-200 border-b border-gray-200">
              <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">{shipment.origin}</td>
              <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">{shipment.destination}</td>
              <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                {Intl.NumberFormat("pt-BR").format(shipment.weight)} kg
              </td>
              <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                {Intl.NumberFormat("pt-BR").format(shipment.volume)} m³</td>
              <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                {Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(shipment.cost)}
              </td>
              <td scope="row" className="mt-1 px-6 py-4 flex gap-2 items-center justify-center">
                <Edit size={12} color='blue' className='hover:cursor-pointer' onClick={() => handleEditClick(shipment)} />
                <Trash size={12} color='red' className='hover:cursor-pointer' onClick={() => handleDeleteClick(shipment)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditShipmentModal
        isOpen={!!editingShipment}
        onClose={handleCloseModal}
        shipmentData={editingShipment}
      />
      <DeleteConfirmationModal
        isOpen={!!deletingShipment}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        shipment={deletingShipment}
      />
    </>
  );
}