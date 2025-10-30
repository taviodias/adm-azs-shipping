import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

const initialFormData = {
  origin: '',
  destination: '',
  weight: '',
  volume: '',
  cost: '',
};

export function CreateShipmentModal({ isOpen, onClose }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setFormData(initialFormData);
    setError(null);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.volume && !formData.weight) {
      setError('Por favor, preencha pelo menos o peso ou o volume.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/shipment', {
        method: 'POST',
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
      setFormData(initialFormData);
      setError('success');
    } catch (err) {
      setError(err.message || 'Erro ao salvar a remessa.');
      setLoading(false);
      return;
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity'>
      <div className='relative w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl transform transition-all sm:p-8'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer'
        >
          <X />
        </button>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          Cadastrar Nova Remessa
        </h2>
        {loading ? (
          <div className='flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin'></div>
          </div>
        ) : error === 'success' ? (
          <div className='flex flex-col items-center justify-center'>
            <Check size={48} color='green' />
            <p className='mt-4 font-medium'>
              Remessa salva com sucesso!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='origin'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Origem
                </label>
                <input
                  type='text'
                  name='origin'
                  id='origin'
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                  placeholder='Ex: São Paulo'
                />
              </div>
              <div>
                <label
                  htmlFor='destination'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Destino
                </label>
                <input
                  type='text'
                  name='destination'
                  id='destination'
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                  placeholder='Ex: Rio de Janeiro'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='weight'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Peso (kg)
                </label>
                <input
                  type='number'
                  name='weight'
                  id='weight'
                  value={formData.weight}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                  placeholder='Ex: 1500'
                />
              </div>
              <div>
                <label
                  htmlFor='volume'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Volume (m³)
                </label>
                <input
                  type='number'
                  name='volume'
                  id='volume'
                  value={formData.volume}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                  placeholder='Ex: 10.5'
                  step='0.01'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='cost'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Custo (R$)
              </label>
              <input
                type='number'
                name='cost'
                id='cost'
                value={formData.cost}
                onChange={handleChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                placeholder='Ex: 250.00'
                step='0.01'
              />
            </div>
            {error && <p className='text-sm text-red-600'>{error}</p>}
            <div className='flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={handleClose}
                className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Salvar Remessa
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
