import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React from 'react';
import { CustomTableProps } from './types';


function CustomTable<T>(props: CustomTableProps<T>): JSX.Element {
    const {data, columns, extraHeader = null, pagination, className} = props;

    return (
        <TableContainer>
             <Table className={className} stickyHeader>
                <TableHead>
                    <TableRow>{extraHeader ? typeof extraHeader === 'function' ? extraHeader() : extraHeader : null}</TableRow>
                    <TableRow>
                        {columns.map((column, index) => {
                            return (
                                <TableCell key={`${column.columnKey.toString()}-${index}`} className={column.className}>
                                    {typeof column.columnName === 'function' ? column.columnName() : column.columnName}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, index) => {
                        return (
                            <TableRow key={index}>
                                {columns.map(column => {
                                    const keyExists = data.hasOwnProperty(column.columnKey);

                                    return (
                                        <TableCell key={`${column.columnKey.toString()}-${index}`} className={column.className}>
                                            {column.render ? column.render(data, keyExists ? data[column.columnKey as keyof T] : null) : keyExists ? data[column.columnKey as keyof T] : null}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    {pagination?.enabled && (
                        <TableRow>
                            <TablePagination {...pagination.params}/>
                        </TableRow>
                    )}
                </TableFooter>
             </Table>
        </TableContainer>  
    )
}

export default CustomTable;