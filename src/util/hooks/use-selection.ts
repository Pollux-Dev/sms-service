import { useCallback, useEffect, useState } from 'react';

export const useSelection = (items = [] as any[]) => {
  const [selected, setSelected] = useState<any[]>([]);

  // console.log('selected: ', selected);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item: any) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item: any) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
