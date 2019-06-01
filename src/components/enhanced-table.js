import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {Link} from 'react-router-dom';
import {TextField} from '@material-ui/core';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    console.log(array);
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'rank', numeric: true, disablePadding: true, label: 'Rank' },
    { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'Platform', numeric: false, disablePadding: false, label: 'Platform' },
    { id: 'Year', numeric: true, disablePadding: false, label: 'Year' },
    { id: 'Genre', numeric: false, disablePadding: false, label: 'Genre' },
    { id: 'Publisher', numeric: false, disablePadding: false, label: 'Publisher' },
    { id: 'Global_Sales', numeric: false, disablePadding: false, label: 'Global_Sales' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    Sl.No
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <div className={classes.title}>
                <TextField
                    id="standard-name"
                    label="Game list"
                    value={props.name}
                    onChange={props.handleChange}
                    margin="normal"
                />
            </div>
            <div className={classes.spacer} />
        </Toolbar>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth : '960px',
        margin: 'auto',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    }
}));

function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(props.rows);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }
    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
    }

    function handleChangeDense(event) {
        setDense(event.target.checked);
    }

    function handleFilter(event){
        setSearchText(event.target.value);
        setRows(props.rows.filter((row)=>{
            return row.Name.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1
        }))
    }
console.log(rows);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar name={searchText} handleChange={handleFilter}/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row,index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.Rank}
                                        >
                                            <TableCell padding="checkbox" align="center">
                                                {index+1}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="right" >
                                                {row.Rank}
                                            </TableCell>
                                            <TableCell align="left"><Link to={'/view/'+row.Rank}>{row.Name}</Link></TableCell>
                                            <TableCell align="left">{row.Platform}</TableCell>
                                            <TableCell align="right">{row.Year}</TableCell>
                                            <TableCell align="left">{row.Genre}</TableCell>
                                            <TableCell align="left">{row.Publisher}</TableCell>
                                            <TableCell align="left">{row.Global_Sales}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[50, 100, 250]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Comfort View"
            />
        </div>
    );
}

export default EnhancedTable;