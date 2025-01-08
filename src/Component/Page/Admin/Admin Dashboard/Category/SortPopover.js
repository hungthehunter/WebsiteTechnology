import { MenuItem, Popover } from '@mui/material';
import React from 'react';

const SortPopover = React.memo(({ anchorEl, open, onClick, onClose, onSortChange }) => {
  const idPopover = open ? 'sort-popover' : undefined;

  return (
    <Popover
      id={idPopover}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <MenuItem onClick={() => onSortChange('name')}>Category</MenuItem>
      <MenuItem onClick={() => onSortChange('')}>Clear Filters</MenuItem>
    </Popover>
  );
});

export default SortPopover;
