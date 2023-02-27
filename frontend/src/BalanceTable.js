import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CircularIndeterminate() {
    return (
        <Box sx={{ display: "flex" }}>
            <CircularProgress sx={{color:'black'}} />
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#000",
        color: theme.palette.common.white,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function createData(name, balance) {
    return { name, balance };
}

const rows = [
    createData("Αττική οδός", 159),
    createData("Εθνική οδός", 237),
    createData("Εγνατία οδός", 262),
    createData("Ιονία οδός", 305),
    createData("Κορινθία οδός", -356),
];

export default function BalanceTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Toll operator company</StyledTableCell>
                        <StyledTableCell align="right">Balance</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { props.data == null ?
                    <div
                        style={{
                            width: 700,
                            height: 400,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            backgroundColor: "transparent",
                        }}>
                        <CircularIndeterminate size={"13rem"} />
                    </div>
                    :
                    props.data.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    color: row.balance >= 0 ? "green" : "red",
                                }}
                                align="right">
                                {row.balance}&euro;
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
