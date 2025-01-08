import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productThunk } from '../../../../../services/redux/thunks/thunk';

export const useReloadTable = (showAlert) => {
    const shouldReload = useSelector((state) => state.product.shouldReload);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const reloadTable = async () => {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);

        try {
            await dispatch(productThunk.getAllProduct());
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
