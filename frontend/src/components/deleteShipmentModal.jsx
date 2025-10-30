import { TriangleAlert } from 'lucide-react';

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, shipment }) {
  if (!isOpen) {
    return null;
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <TriangleAlert size={64} color='red' />

          <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">
            Confirmar Exclusão
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Tem certeza que deseja excluir a remessa{' '}
            <span className="font-semibold">#{shipment?.id}</span>
            <br />
            (Origem: <span className="font-semibold">{shipment?.origin}</span>)?
            <br />
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex flex-col-reverse gap-3 w-full sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}