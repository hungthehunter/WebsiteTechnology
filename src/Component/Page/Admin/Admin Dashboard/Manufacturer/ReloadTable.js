import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manufacturerThunk } from '../../../../../services/redux/thunks/thunk';

export const useReloadTable = (showAlert) => {
    const shouldReload = useSelector((state) => state.manufacturer.shouldReload);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const reloadTable = async () => {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);

        try {
            await dispatch(manufacturerThunk.getAllManufacturers());
            if (showAlert) {
                showAlert('Table reloaded successfully.', 'success');
            }
        } catch (error) {
            console.error('Error reloading table:', error);
            if (showAlert) {
                showAlert('Failed to reload table.', 'error');
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false); // Cooldown period
            }, 2000); // 2-second delay
        }
    };

    return { shouldReload, reloadTable, isLoading };
};
