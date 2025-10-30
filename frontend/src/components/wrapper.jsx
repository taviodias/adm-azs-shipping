import { useCallback, useEffect, useState } from 'react';
import { Table } from './table';
import { CreateShipmentModal } from './createShipmentModal';
import { useDebounce } from './useDebounce';

export function Wrapper() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageable, setPageable] = useState({});
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const debouncedFilter = useDebounce(filter, 300);

  const handlePrevious = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
    }
  };
  
  const handleNext = () => {
    if (page < pageable.totalPages) {
      const newPage = page + 1;
      setPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const fetchShipments = useCallback(async () => {
    const ships = await fetch(
      `http://localhost:8080/shipment?page=${page}&limit=5${debouncedFilter && `&filter=${debouncedFilter}`}`
    )
      .then((resp) => resp.json())
      .catch((e) => console.log(e));
    console.log(ships);
    setPageable(ships);
    setShipments(ships.content);
  }, [page, debouncedFilter]);
  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleOpenModal = () => {
    setDialogOpen(true);
  };

  const handleCloseModal = () => {
    fetchShipments();
    setDialogOpen(false);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between mx-4'>
        <h2 className='font-bold text-white tracking-wide'>AZS - Shipping</h2>
        <input
          value={filter}
          onChange={handleFilterChange}
          type='text'
          placeholder='Filtrar remessas...'
          className='px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
        />
        <button
          type='button'
          className='text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 rounded-lg text-sm font-bold px-5 py-2.5 focus:outline-none'
          onClick={handleOpenModal}
        >
          Adicionar Remessa
        </button>
      </div>
      <div className='w-3xl h-[305px] bg-white border-2 border-gray-700 shadow-lg rounded-xl overflow-hidden'>
        <Table shipments={shipments} setShipments={setShipments} fetchShipments={fetchShipments} setPage={setPage} />
      </div>
      <div className='flex mx-4 justify-between items-center'>
        <p className='text-white text-xs'>Página {pageable.number + 1} de {pageable.totalPages}</p>
        <div className='flex'>

        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className='flex font-bold items-center justify-center px-3 h-8 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed'
        >
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={page === pageable.totalPages || pageable.totalPages === 0}
          className='flex items-center justify-center px-3 h-8 ms-3 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed'
        >
          Próxima
        </button>
          </div>
      </div>
      <CreateShipmentModal isOpen={dialogOpen} onClose={handleCloseModal}/>
    </div>
  );
}
