import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
const PromotionTable = React.memo((promotions , onViewCategory , onEditCategory , onDeleteCategory ) => {
    return(
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Id
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Image
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Name
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Discount (%)
              </TableCell>
              <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                Active
              </TableCell>
              <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promotion, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {promotion.id}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  <img
                    src={promotion?.imageCloud?.url}
                    alt={promotion?.name}
                    width="100"
                    height="30"
                    style={{ objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {promotion.name}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {promotion.discountPercentage}
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                  {new Date(promotion.endDate) < new Date()
                    ? "Expired"
                    : "Not Expired"}
                </TableCell>

                <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setActiveComponent({
                        name: "AdminViewPromotion",
                        props: { id: promotion.id },
                      })
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setActiveComponent({
                        name: "AdminEditPromotion",
                        props: { id: promotion.id },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDialog(promotion.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredPromotions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  style={{ textAlign: "center", paddingTop: 100 }}
                >
                  No promotions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
})

export default PromotionTable;