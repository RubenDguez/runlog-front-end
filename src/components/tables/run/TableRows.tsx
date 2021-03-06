import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  Box,
  IconButton,
  TableCell as TC,
  TableCellProps,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../../hooks/useDialog";
import { setDialogClear } from "../../../store/features/app/appSlice";
import { useDeleteMutation } from "../../../store/features/run/runDTOSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { EDialogResponse, EDialogType, IRunStateDTO } from "../../../types";
import { toCurrency, toLocalString } from "../../../utils";
import { Tooltip } from "../../UI/common/Tooltip";

interface ITableRows {
  data: IRunStateDTO;
}

export const TableRows = ({ data }: ITableRows) => {
  const response = useAppSelector((state) => state.app.dialog.response);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteRow] = useDeleteMutation();
  const [rowNumber, setRowNumber] = useState(0);
  const dialog = useDialog();

  const handleDeleteRow = useCallback(
    (id: number) => {
      setRowNumber(id);
      dialog(
        EDialogType.YES_NO,
        "delete",
        "Are you sure you want to delete this record?, Once deleted it cannot be recovered."
      );
    },
    [dialog]
  );

  useEffect(() => {
    if (response === EDialogResponse.YES && rowNumber !== 0) {
      deleteRow(rowNumber);
      dispatch(setDialogClear());
    }
  }, [response, rowNumber, deleteRow, dispatch]);

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <Tooltip
            title={`Open load ${data.loadNumber}`}
            placement="top-end"
            arrow
          >
            <IconButton
              size="small"
              onClick={() => {
                navigate(`/authorized/run-form/${data.id}`);
              }}
            >
              <FileOpenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`Delete load ${data.loadNumber}`}
            placement="top-start"
            arrow
          >
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteRow(data.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell>{data.loadNumber}</TableCell>

      <TableCell>{data.pickUpLocation}</TableCell>
      <TableCell>{data.dropOffLocation}</TableCell>

      <TableCell>
        {moment(data.pickUpDate.substring(0, 10)).format("MMM DD YYYY")}
      </TableCell>
      <TableCell>
        {moment(data.dropOffDate.substring(0, 10)).format("MMM DD YYYY")}
      </TableCell>
      <TableCell align="center">
        {data.secondLoad && <CheckIcon fontSize="small" />}
      </TableCell>
      <ColoredTableCell align="right">
        {toLocalString(data.loadedMiles)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toLocalString(data.emptyMiles)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.loadedCash)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.emptyCash)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.extras)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {toCurrency(data.totalTrip)}
      </ColoredTableCell>
    </TableRow>
  );
};

const TableCell = ({ children, ...rest }: TableCellProps) => {
  return <TC {...rest}>{children}</TC>;
};

const ColoredTableCell = ({ children, ...rest }: TableCellProps) => {
  return <TC {...rest}>{children}</TC>;
};
