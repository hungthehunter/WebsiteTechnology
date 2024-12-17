import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const ProductTable = React.memo(({ products, onViewProduct, onEditProduct, onDeleteProduct }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Id</TableCell>
            <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Name</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Price</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Quantity</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Category</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Manufacturer</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Status</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>{product?.id}</TableCell>
              <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>{product?.productName}</TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>${product?.unitPrice}</TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>{product?.unitInStock}</TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                {product?.category?.name}
              </TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                {product?.manufacturer?.name}
              </TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                {product.unitInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </TableCell>
              <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                <Button variant="outlined" onClick={() => onViewProduct(product.id)}>
                  View
                </Button>
                <Button variant="outlined" onClick={() => onEditProduct(product.id)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => onDeleteProduct(product.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} style={{ textAlign: 'center', paddingTop: 100 }}>
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ProductTable;
