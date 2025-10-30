import { X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
export function EditShipmentModal({ isOpen, onClose, shipmentData }) {
  const [formData, setFormData] = useState({
    id: null,
    origin: '',
    destination: '',
    weight: '',
    volume: '',
    cost: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shipmentData) {
      setFormData(shipmentData);
    } else {
      setFormData({
        id: null,
        origin: '',
        destination: '',
        weight: '',
        volume: '',
        cost: '',
      });
    }
  }, [shipmentData]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      id: null,
      origin: '',
      destination: '',
      weight: '',
      volume: '',
      cost: '',
    });
    setError(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.weight && !formData.volume) {
      setError("Peso ou Volume devem ser preenchidos.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/shipment/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          weight: formData.weight ? parseFloat(formData.weight) : 0,
          volume: formData.volume ? parseFloat(formData.volume) : 0,
          cost: parseFloat(formData.cost),
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar a remessa.');
      }
      setLoading(false);
      setError('success');
    } catch (err) {
      setError(err.message || 'Erro ao salvar a remessa.');
      setLoading(false);
      return;
    }
    setLoading(false);
    setError('success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
    >
      <div className="relative w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Editar Remessa #{formData.id}
        </h2>
        {loading ? (
          <div className='flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin'></div>
          </div>
        ) : error === 'success' ? (
          <div className='flex flex-col items-center justify-center'>
            <Check size={48} color='green' />
            <p className='mt-4 font-medium'>
              Remessa atualizada com sucesso!
            </p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-origin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Origem
              </label>
              <input
                type="text"
                name="origin"
                id="edit-origin"
                value={formData.origin || ''}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="edit-destination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destino
              </label>
              <input
                type="text"
                name="destination"
                id="edit-destination"
                value={formData.destination || ''}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-weight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peso (kg)
              </label>
              <input
                type="number"
                name="weight"
                id="edit-weight"
                value={formData.weight || ''}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="edit-volume"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Volume (m³)
              </label>
              <input
                type="number"
                name="volume"
                id="edit-volume"
                value={formData.volume || ''}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-cost"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Custo (R$)
            </label>
            <input
              type="number"
              name="cost"
              id="edit-cost"
              value={formData.cost || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              step="0.01"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}