import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {createUseStyles} from "react-jss";

import actionsFlights from "../actions/flights";
import actionsServices from "../actions/services";

import useTheme from "misc/hooks/useTheme";
import storage from "misc/storage";
import pagesURLs from "constants/pagesURLs";
import { flightDetails } from "constants/pages";

import PageContainer from "pageProviders/components/PageContainer";

import Typography from 'components/Typography';
import Alert from "components/Alert";
import Loading from "components/Loading";
import Card from "components/Card";
import CardTitle from "components/CardTitle";
import CardContent from "components/CardContent";
import Trash from "components/icons/Trash";
import IconButton from "components/IconButton";
import Dialog from "components/Dialog";
import Button from "components/Button";
import Snackbar from "components/Snackbar";
import Add from "components/icons/Add";
import Filter from "components/icons/Filter";
import Select from "components/Select";
import TextField from "components/TextField";
import MenuItem from "components/MenuItem";
import Checkbox from "components/Checkbox";
import InputLabel from "components/InputLabel";
import TablePagination from "components/TablePagination";


const getClasses = createUseStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${theme.spacing(1)}px`,
        cursor: 'pointer',
        '&:hover $deleteButton': {
            display: 'block !important',
        },
        minWidth: '50%',
        maxWidth: '80%'
    },
    deleteButton: {
        display: 'none !important',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(1)}px`,
    },
    rowContent: {
        display: 'flex',
        padding: `${theme.spacing(1)}px`,
        gap: `${theme.spacing(5)}px`,
    },
    rowTitle: {
        display: 'flex',
        gap: `${theme.spacing(1)}px`,
    },
    rowItemContent: {
        padding: `${theme.spacing(1)}px`,
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${theme.spacing(1)}px`,
        marginTop: `${theme.spacing(2)}px`,
    },
}));

function Flights() {
    const dispatch = useDispatch();
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const {formatMessage} = useIntl();
    const navigate = useNavigate();

    const [state, setState] = useState({
        externalErrorMessages: [],
        isDeleteDialogOpen: false,
        flightToDelete: null,
        isSnackbarOpen: false,
        snackbarMessage: '',
    });

    const [filter, setFilter] = useState(() => {
        const savedFilter = storage.getItem('flightFilter');
        return savedFilter ? JSON.parse(savedFilter) : {
            departureAirport: '',
            arrivalAirport: '',
            services: [],
        };
    });

    const [pagination, setPagination] = useState(() => {
        const savedPagination = storage.getItem('flightPagination');
        return savedPagination ? JSON.parse(savedPagination) : {
            currentPage: 0,
            pageSize: 10,
            totalPages: 0,
            totalElements: 0,
        };
    });

    const fetchFlights = () => {
        dispatch(actionsFlights.fetchFlights({
            departureAirport: filter.departureAirport,
            arrivalAirport: filter.arrivalAirport,
            services: filter.services,
            page: pagination.currentPage,
            size: pagination.pageSize,
        }));
    }

    useEffect(() => {
        fetchFlights();
        dispatch(actionsServices.fetchServices());
    }, [dispatch, pagination.pageSize, pagination.currentPage]);

    const {
        list: flights,
        isLoading,
        isFetchFailed,
        isDeleteFailed,
        errors,
        page,
        size,
        totalElements,
    } = useSelector(state => state.flights);

    const {
        list: services,
    } = useSelector(state => state.services);

    useEffect(() => {
        const messages = errors.map(error => error.message);
        setState(prevState => ({
            ...prevState,
            externalErrorMessages: messages,
        }));
    }, [errors]);

    useEffect(() => {
        localStorage.setItem('flightFilter', JSON.stringify(filter));
    }, [filter]);

    useEffect(() => {
        localStorage.setItem('flightPagination', JSON.stringify(pagination));
    }, [pagination]);

    const handleCloseDeleteDialog = () => {
        setState(prevState => ({
            ...prevState,
            isDeleteDialogOpen: false,
            flightToDelete: null,
        }));
    };

    const handleConfirmDelete = () => {
        const {flightToDelete} = state;
        dispatch(actionsFlights.deleteFlight(flightToDelete.id)).then(
            () => {
                handleCloseDeleteDialog();
                setState(prevState => ({
                    ...prevState,
                    isSnackbarOpen: true,
                    snackbarMessage: formatMessage({id: 'deleteSuccessMessage'}),
                }));
                fetchFlights()
            }
        ).catch()
    };

    const navigateToDetails = (flightId) => {
        navigate(`${pagesURLs[flightDetails].replace(':id', flightId)}`);
    };

    const handleServicesChange = (event) => {
        const {target: {value}} = event;
        setFilter(prevFilter => ({
            ...prevFilter,
            services: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleApplyFilter = () => {
        setPagination(prev => ({
            ...prev,
            currentPage: 0
        }));
        dispatch(actionsFlights.fetchFlights({
            departureAirport: filter.departureAirport,
            arrivalAirport: filter.arrivalAirport,
            services: filter.services,
            page: 0,
            size: pagination.pageSize,
        }));
    };

    return (
        <>
            <PageContainer>
                <div className={classes.rowContent}>
                    <div className={classes.rowItemContent}>
                        <Typography variant={"title"}>
                            {formatMessage({id: 'title'})}
                        </Typography>
                    </div>
                    <IconButton onClick={() => navigateToDetails(0)} children={
                        <Add/>
                    }/>
                </div>
                <div className={classes.rowContent}>
                    <div className={classes.rowItemContent}>
                        <TextField
                            value={filter.departureAirport}
                            onChange={
                                ({target}) => setFilter({
                                    ...filter,
                                    departureAirport: target.value,
                                })
                            }
                            helperText={formatMessage({id: 'departureAirportText'})}
                            label={formatMessage({id: 'forExampleText'}) + 'JFK'}
                        />
                    </div>
                    <div className={classes.rowItemContent}>
                        <TextField
                            helperText={formatMessage({id: 'arrivalAirportText'})}
                            value={filter.arrivalAirport}
                            onChange={
                                ({target}) => setFilter({
                                    ...filter,
                                    arrivalAirport: target.value,
                                })
                            }
                            label={formatMessage({id: 'forExampleText'}) + 'LAX'}
                        />
                    </div>
                    <div className={classes.rowItemContent}>
                        <InputLabel id="filter-services-label" size={'medium'} children={
                            formatMessage({id: 'filterServicesText'})
                        }/>
                        <Select
                            labelId="filter-services-label"
                            id="services"
                            multiple={true}
                            value={filter.services}
                            onChange={handleServicesChange}
                            fullWidth={false}
                            fullHeight={false}
                            renderValue={(selected) => selected.length}
                            label={'Services'}
                            size={'small'}
                        >
                            {services.map((service) => (
                                <MenuItem key={service.name} value={service.name}>
                                    <Checkbox checked={filter.services.indexOf(service.name) > -1}/>
                                    <Typography variant={'default'}>{service.name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <IconButton
                        onClick={handleApplyFilter}
                        children={
                            <>
                                <Typography variant={'default'}>
                                    {formatMessage({id: 'applyFilterText'})}
                                </Typography>
                                <Filter/>
                            </>
                        }/>
                </div>
                <div className={classes.rowContent}>
                    <TablePagination
                        count={totalElements}
                        page={page}
                        rowsPerPage={size}
                        labelRowsPerPage={formatMessage({id: 'rowsPerPageText'})}
                        onPageChange={
                            (event, page) => setPagination(prev => ({
                                ...prev,
                                currentPage: page,
                            }))
                        }
                        onRowsPerPageChange={
                            (event) => setPagination(prev => ({
                                ...prev,
                                pageSize: event.target.value,
                            }))
                        }
                    />
                </div>
                {isFetchFailed && (
                    <div className={classes.list}>
                        {state.externalErrorMessages.map((message, index) => (
                            <Alert
                                key={index}
                                severity={'error'}
                                variant={'filled'}
                                children={
                                    <Typography color={'white'}>
                                        {formatMessage({id: 'fetchError'})}: {message}
                                    </Typography>
                                }/>
                        ))}
                    </div>
                )}
                {isLoading && (
                    <Loading/>
                )}
                {flights.length > 0 && (
                    <div className={classes.list}>
                        {flights.map((flight, index) => (
                            <div
                                key={index}
                                className={classes.item}
                                onClick={() => navigateToDetails(flight.id)}
                            >
                                <Card>
                                    <CardTitle>
                                        <div className={classes.rowTitle}>
                                            <Typography variant={"subtitle"} color={'tertiary'}>
                                                {formatMessage({id: 'flightNumberText'})}:
                                            </Typography>
                                            <Typography variant={"subtitle"}>
                                                {flight.flightNumber}
                                            </Typography>
                                        </div>
                                    </CardTitle>
                                    <CardContent>
                                        <div className={classes.rowContent}>
                                            <div>
                                                <Typography color={'tertiary'}>
                                                    {formatMessage({id: 'departureAirportText'})}:
                                                </Typography>

                                                <Typography>
                                                    {flight.departureAirport}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography color={'tertiary'}>
                                                    {formatMessage({id: 'arrivalAirportText'})}:
                                                </Typography>
                                                <Typography>
                                                    {flight.arrivalAirport}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography color={'tertiary'}>
                                                    {formatMessage({id: 'departureTimeText'})}:
                                                </Typography>
                                                <Typography>
                                                    {flight.departureTime.slice(0, -4).split('T').join(' ')}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography color={'tertiary'}>
                                                    {formatMessage({id: 'arrivalTimeText'})}:
                                                </Typography>
                                                <Typography>
                                                    {flight.arrivalTime.slice(0, -4).split('T').join(' ')}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className={classes.deleteButton}>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        setState(prevState => ({
                                            ...prevState,
                                            isDeleteDialogOpen: true,
                                            flightToDelete: flight,
                                        }));
                                    }} children={
                                        <Trash/>
                                    }/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </PageContainer>

            {state.isDeleteDialogOpen && (
                <Dialog
                    open={state.isDeleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    maxWidth="sm"
                >
                    <div style={{padding: '16px'}}>
                        <Typography variant={'title'}>
                            {formatMessage({id: 'dialogDeleteTitle'})}
                        </Typography>
                        <Typography>
                            {formatMessage({id: 'dialogDeleteMessageNumber'})}
                            {state.flightToDelete.flightNumber}
                            {formatMessage({id: 'dialogDeleteMessageDepartureTime'})}
                            {state.flightToDelete.departureTime.slice(0, -4).split('T').join(' ')}
                            {formatMessage({id: 'dialogDeleteMessageArrivalTime'})}
                            {state.flightToDelete.arrivalTime.slice(0, -4).split('T').join(' ')}.
                        </Typography>

                        {isLoading && (
                            <Loading/>
                        )}

                        {isDeleteFailed && (
                            <div className={classes.list}>
                                {state.externalErrorMessages.map((message, index) => (
                                    <Alert
                                        key={index}
                                        severity={'error'}
                                        variant={'filled'}
                                        children={
                                            <Typography color={'white'}>
                                                {formatMessage({id: 'deleteError'})}: {message}
                                            </Typography>
                                        }/>
                                ))}
                            </div>
                        )}

                        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
                            <Button onClick={handleConfirmDelete} color="secondary">
                                {formatMessage({id: 'confirmDeletingText'})}
                            </Button>
                            <Button onClick={handleCloseDeleteDialog}>
                                {formatMessage({id: 'cancelDeletingText'})}
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}

            <Snackbar
                open={state.isSnackbarOpen}
                onClose={() => {
                    setState(prevState => ({
                        ...prevState,
                        isSnackbarOpen: false,
                        snackbarMessage: '',
                    }))
                }}
                children={
                    <div>
                        <Alert severity={'success'} variant={'filled'}
                               children={
                                   <Typography color={'inherit'}>
                                       {state.snackbarMessage}
                                   </Typography>
                               }/>
                    </div>
                }
            />
        </>
    );
}

export default Flights;
