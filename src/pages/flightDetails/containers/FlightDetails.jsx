import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import PageContainer from '../../../pageProviders/components/PageContainer';
import {useDispatch, useSelector} from "react-redux";
import useTheme from "../../../misc/hooks/useTheme";
import {useNavigate, useParams} from "react-router-dom";
import actionsFlightDetails from "../actions/flightDetails";
import actionsServices from "../../flights/actions/services";
import actionsAirports from "../actions/airports";
import Typography from "../../../components/Typography";
import IconButton from "../../../components/IconButton";
import Edit from "../../../components/icons/Edit";
import Back from "../../../components/icons/Back";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert/Alert";
import TextField from "../../../components/TextField";
import Select from "../../../components/Select";
import InputLabel from "../../../components/InputLabel";
import MenuItem from "../../../components/MenuItem";
import Checkbox from "../../../components/Checkbox";
import Cancel from "../../../components/icons/Cancel";
import Snackbar from "../../../components/Snackbar";
import Add from "../../../components/icons/Add";

const getClasses = createUseStyles((theme) => ({
    rowContent: {
        display: 'flex',
        padding: `${theme.spacing(1)}px`,
        gap: `${theme.spacing(2)}px`,
    },
    rowContentColumn: {
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing(1)}px`,
        gap: `${theme.spacing(2)}px`,
        maxWidth: '40%'
    },
    rowItemContent: {
        padding: `${theme.spacing(1)}px`,
    },
    rowItemTitle: {
        padding: `${theme.spacing(1)}px 0`,
    },
}));

function FlightDetails() {
    const dispatch = useDispatch();
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const {formatMessage} = useIntl();
    const navigate = useNavigate();

    const [state, setState] = useState({
        externalErrorMessages: [],
        isEditing: false,
        isSnackbarOpen: false,
        snackbarMessage: '',
    });

    const [processedFlight, setProcessedFlight] = useState({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        services: [],
    });

    const {id} = useParams();

    const isCreating = id === '0';

    useEffect(() => {
        if (!isCreating) {
            dispatch(actionsFlightDetails.fetchFlightDetails(id));
        } else {
            setState(prevState => ({
                    ...prevState,
                    isEditing: true,
                    externalErrorMessages: [],
                }
            ))
        }
        dispatch(actionsServices.fetchServices());
        dispatch(actionsAirports.fetchAirports());
    }, []);

    const {
        flight,
        isLoading,
        isFetchFailed,
        errors
    } = useSelector((state) => state.flightDetails);

    const {
        list: services,
    } = useSelector(state => state.services);

    const {
        list: airports,
    } = useSelector(state => state.airports);

    const isViewing = !isCreating && !state.isEditing && !isLoading;

    useEffect(() => {
        const messages = errors.map(error => error.message);
        setState(prevState => ({
            ...prevState,
            externalErrorMessages: messages,
        }));
    }, [errors]);

    const handleServicesChange = (event) => {
        const {target: {value}} = event;
        setProcessedFlight(prevFilter => ({
            ...prevFilter,
            services: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const [validFields, setValidFields] = useState({
        flightNumber: true,
        departureAirport: true,
        arrivalAirport: true,
        departureTime: true,
        arrivalTime: true,
        services: true,
    });

    const validateEditedFlight = (editedFlight) => {
        const validFields = {
            flightNumber: !!editedFlight.flightNumber,
            departureAirport: !!editedFlight.departureAirport,
            arrivalAirport: !!editedFlight.arrivalAirport,
            departureTime: !!editedFlight.departureTime,
            arrivalTime: !!editedFlight.arrivalTime,
            services: !!editedFlight.services.length,
        };
        setValidFields(validFields);
        return Object.values(validFields).every((field) => field);
    }

    const handleSaveClick = () => {
        if (validateEditedFlight(processedFlight)) {
            dispatch(actionsFlightDetails.editFlightDetails(id, processedFlight))
                .then(() => {
                    setState(prevState => ({
                        ...prevState,
                        isEditing: false,
                        isSnackbarOpen: true,
                        snackbarMessage: formatMessage({id: 'editSuccessText'}),
                        externalErrorMessages: [],
                    }));
                })
                .catch(() => {
                });
        }
    };

    const handleCreateClick = () => {
        if (validateEditedFlight(processedFlight)) {
            dispatch(actionsFlightDetails.createFlight(processedFlight))
                .then(() => {
                    setState(prevState => ({
                        ...prevState,
                        isSnackbarOpen: true,
                        snackbarMessage: formatMessage({id: 'createSuccessText'}),
                        externalErrorMessages: [],
                    }));
                    navigate(-1)
                })
                .catch(() => {
                });
        }
    }

    return (
        <>
            <PageContainer>
                <div className={classes.rowContent}>
                    <IconButton
                        onClick={() => {
                            navigate(-1);
                        }}
                        children={
                            <Back/>
                        }/>
                    <div className={classes.rowItemContent}>
                        {!isCreating && (
                            <Typography variant={"title"}>
                                {formatMessage({id: 'titleView'})}
                            </Typography>
                        )}
                        {isCreating && (
                            <Typography variant={"title"}>
                                {formatMessage({id: 'titleCreate'})}
                            </Typography>
                        )}
                    </div>
                    {!isCreating && <IconButton
                        onClick={() => {
                            setState(prevState => ({
                                ...prevState,
                                isEditing: !state.isEditing,
                                externalErrorMessages: [],
                            }))
                            setProcessedFlight({
                                flightNumber: flight.flightNumber,
                                departureAirport: flight.departureAirport?.airportCode,
                                arrivalAirport: flight.arrivalAirport?.airportCode,
                                departureTime: flight.departureTime,
                                arrivalTime: flight.arrivalTime,
                                services: flight.services.map(service => service.name),
                            })
                        }}
                        children={
                            <Edit/>
                        }/>}
                </div>
                {isLoading && (
                    <Loading/>
                )}
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
                {isViewing && (
                    <div className={classes.rowContentColumn}>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'flightNumberText'})}
                                </Typography>
                            </div>
                            <Typography>
                                {flight.flightNumber}
                            </Typography>
                        </div>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'departureAirportText'})}
                                </Typography>
                            </div>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportCodeCaption'})}
                            </Typography>
                            <Typography>
                                {flight.departureAirport?.airportCode}
                            </Typography>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportNameCaption'})}
                            </Typography>
                            <Typography>
                                {flight.departureAirport?.name}
                            </Typography>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportLocationTimezoneCaption'})}
                            </Typography>
                            <Typography>
                                {flight.departureAirport?.city}, {flight.departureAirport?.country}, {flight.departureAirport?.timezone}
                            </Typography>
                        </div>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'departureAirportText'})}
                                </Typography>
                            </div>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportCodeCaption'})}
                            </Typography>
                            <Typography>
                                {flight.arrivalAirport?.airportCode}
                            </Typography>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportNameCaption'})}
                            </Typography>
                            <Typography>
                                {flight.arrivalAirport?.name}
                            </Typography>
                            <Typography variant={'caption'} color={'tertiary'}>
                                {formatMessage({id: 'airportLocationTimezoneCaption'})}
                            </Typography>
                            <Typography>
                                {flight.arrivalAirport?.city}, {flight.arrivalAirport?.country}, {flight.arrivalAirport?.timezone}
                            </Typography>
                        </div>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'departureTimeText'})}
                                </Typography>
                            </div>
                            <Typography>
                                {flight.departureTime}
                            </Typography>
                        </div>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'arrivalTimeText'})}
                                </Typography>
                            </div>
                            <Typography>
                                {flight.arrivalTime}
                            </Typography>
                        </div>
                        <div className={classes.rowItemContent}>
                            <div className={classes.rowItemTitle}>
                                <Typography variant={"subtitle"} color={'tertiary'}>
                                    {formatMessage({id: 'servicesText'})}
                                </Typography>
                            </div>
                            <Typography>
                                {flight.services?.map((service) => {
                                    return (
                                        <div className={classes.rowItemContent}>
                                            <Typography color={'tertiary'}>{service.name}</Typography>
                                            <Typography>{service.description}</Typography>
                                        </div>
                                    )
                                })}
                            </Typography>
                        </div>
                    </div>
                )}
                {state.isEditing && (
                    <div className={classes.rowContentColumn}>
                        <div className={classes.rowItemContent}>
                            <TextField
                                label={formatMessage({id: 'flightNumberText'})}
                                helperText={formatMessage({id: 'flightNumberHelperText'})}
                                value={processedFlight.flightNumber}
                                onChange={(event) => {
                                    setProcessedFlight(prevFilter => ({
                                        ...prevFilter,
                                        flightNumber: event.target.value,
                                    }));
                                }}
                                isError={!validFields.flightNumber}
                            />
                        </div>
                        <div className={classes.rowItemContent}>
                            <InputLabel id="departure-airport-label" children={
                                formatMessage({id: 'departureAirportText'})
                            }/>
                            <Select
                                labelId="departure-airport-label"
                                id="departure-airport"
                                onChange={(event) => {
                                    setProcessedFlight(prevFilter => ({
                                        ...prevFilter,
                                        departureAirport: event.target.value,
                                    }));
                                }}
                                value={processedFlight.departureAirport}
                                fullWidth={false}
                                fullHeight={false}
                                label={'Services'}
                                size={'small'}
                                error={!validFields.departureAirport}
                            >
                                {airports.map((airport) => (
                                    <MenuItem key={airport.id} value={airport.airportCode}>
                                        {airport.airportCode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={classes.rowItemContent}>
                            <InputLabel id="arrival-airport-label" children={
                                formatMessage({id: 'arrivalAirportText'})
                            }/>
                            <Select
                                labelId="arrival-airport-label"
                                id="arrival-airport"
                                onChange={(event) => {
                                    setProcessedFlight(prevFilter => ({
                                        ...prevFilter,
                                        arrivalAirport: event.target.value,
                                    }));
                                }}
                                fullWidth={false}
                                fullHeight={false}
                                value={processedFlight.arrivalAirport}
                                label={'Services'}
                                size={'small'}
                                error={!validFields.arrivalAirport}
                            >
                                {airports.map((airport) => (
                                    <MenuItem key={airport.id} value={airport.airportCode}>
                                        {airport.airportCode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={classes.rowItemContent}>
                            <TextField
                                value={processedFlight.departureTime.slice(0, -4)}
                                inputType={'datetime-local'}
                                label={formatMessage({id: 'departureTimeText'})}
                                helperText={formatMessage({id: 'departureTimeHelperText'})}
                                onChange={(event) => {
                                    setProcessedFlight(prevFilter => ({
                                        ...prevFilter,
                                        departureTime: event.target.value + ':00Z',
                                    }));
                                }}
                                isError={!validFields.departureTime}
                            />
                        </div>
                        <div className={classes.rowItemContent}>
                            <TextField
                                value={processedFlight.arrivalTime.slice(0, -4)}
                                inputType={'datetime-local'}
                                label={formatMessage({id: 'arrivalTimeText'})}
                                helperText={formatMessage({id: 'arrivalTimeHelperText'})}
                                onChange={(event) => {
                                    setProcessedFlight(prevFilter => ({
                                        ...prevFilter,
                                        arrivalTime: event.target.value + ':00Z',
                                    }));
                                }}
                                isError={!validFields.arrivalTime}
                            />
                        </div>
                        <div className={classes.rowItemContent}>
                            <InputLabel id="services-label" children={
                                formatMessage({id: 'servicesText'})
                            }/>
                            <Select
                                labelId="services-label"
                                id="services"
                                multiple={true}
                                value={processedFlight.services}
                                onChange={handleServicesChange}
                                fullWidth={false}
                                fullHeight={false}
                                renderValue={(selected) => selected.length}
                                label={'Services'}
                                size={'small'}
                                error={!validFields.services}
                            >
                                {services.map((service) => (
                                    <MenuItem key={service.name} value={service.name}>
                                        <Checkbox checked={processedFlight.services.indexOf(service.name) > -1}/>
                                        <Typography variant={'default'}>{service.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        {state.externalErrorMessages.length > 0 && (
                            <div className={classes.list}>
                                {state.externalErrorMessages.map((message, index) => (
                                    <Alert
                                        key={index}
                                        severity={'error'}
                                        variant={'filled'}
                                        children={
                                            <Typography color={'white'}>
                                                {formatMessage({id: 'editFailureText'})}: {message}
                                            </Typography>
                                        }/>
                                ))}
                            </div>
                        )}
                        <div className={classes.rowContent}>
                            {isCreating && (
                                <>
                                    <IconButton
                                        onClick={handleCreateClick}
                                        children={
                                            <Add/>
                                        }
                                    />
                                    <IconButton
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                        children={
                                            <Cancel/>
                                        }
                                    /></>
                            )}
                            {!isCreating && (
                                <>
                                    <IconButton
                                        onClick={handleSaveClick}
                                        children={<Edit/>}
                                    />
                                    <IconButton
                                        onClick={() => {
                                            setState(prevState => ({
                                                ...prevState,
                                                isEditing: false,
                                                externalErrorMessages: [],
                                            }))
                                        }}
                                        children={
                                            <Cancel/>
                                        }/>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </PageContainer>
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
    )
}

export default FlightDetails;
