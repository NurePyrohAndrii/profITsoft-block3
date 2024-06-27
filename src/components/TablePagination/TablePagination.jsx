import TablePaginationMUI from "@mui/material/TablePagination";

const tablePagination = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    labelRowsPerPage,
}) => {
    return (
        <TablePaginationMUI
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            labelRowsPerPage={labelRowsPerPage}
        />
    );
}

export default tablePagination;