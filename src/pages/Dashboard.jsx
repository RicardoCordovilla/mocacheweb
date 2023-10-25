import { Backdrop, Box, Button, Card, CircularProgress, Container, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SensorContainer from '../components/SensorContainer'
import { useNavigate, useParams } from 'react-router-dom'
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { ExportToExcel } from '../components/utils/ExportToExcel';
import DateRangePicker from '../components/DateRangePicker';
import { nowDate } from '../utils/dateformat';
import axios from 'axios';
import { config } from '../config';


const Dashboard = () => {

    const { station } = useParams()
    console.log(station)
    const navigate = useNavigate()
    const [showDateRange, setShowDateRange] = React.useState(false)

    const [from, setFrom] = React.useState(nowDate())
    const [to, setTo] = React.useState(nowDate())

    const [data, setData] = React.useState([])
    const [openBackdrop, setOpenBackdrop] = React.useState(false)


    const getData = async () => {
        setOpenBackdrop(true)
        axios.get(config.db.baseurl + 'registers/' + station + '/date?' + 'from=' + (from) + '&to=' + (to))
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setOpenBackdrop(false)
            })
            .catch(err => console.log(err))
    }



    const formatCsv = (data) => {
        let csvformat = data?.map((reg, index) => ({
            Equipo: station,
            fecha: reg.date,
            hora: reg.time,
            humedad: reg.hum,
            temperatura: reg.temp,
        }))
        return csvformat
    }

    useEffect(() => {
        setShowDateRange(false)
        setData([])
    }, [station])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                // maxWidth: '700px',
                // height: '100%',
                // m: 1,
                p: 2,
                // bgcolor: '#f5f5f5',
                // flexGrow: 1,
            }}
        >

            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    // width: '100%',
                    // maxWidth: '700px',
                    // height: '100%',
                    // m: 1,
                    p: 2,
                    // bgcolor: '#f5f5f5',
                    // flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        // maxWidth: '700px',
                        // height: '100%',
                        // m: 1,
                        p: 2,
                        // bgcolor: '#f5f5f5',
                        // flexGrow: 1,
                    }}
                >

                    <FormControl sx={{
                        m: 1,
                        minWidth: 120,
                        maxWidth: 300,
                    }}
                    >
                        <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
                        <Select
                            value={station || 'ESP1'}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Equipo"
                            onChange={(e) => navigate('/' + e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="ESP1">ESP1</MenuItem>
                            <MenuItem value="ESP2">ESP2</MenuItem>
                            <MenuItem value="ESP3">ESP3</MenuItem>
                            <MenuItem value="ESP4">ESP4</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        // variant="contained"
                        // color="primary"
                        size="small"
                        // className={classes.button}
                        startIcon={<PiMicrosoftExcelLogo />}
                        onClick={() => setShowDateRange(!showDateRange)}
                    >

                        <Typography variant="h6" component="div"
                        // sx={{ flexGrow: 1 }}
                        >
                            Descargar datos
                        </Typography>

                    </Button>


                </Box>
                {
                    showDateRange &&
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            // width: '100%',
                            // maxWidth: '700px',
                            // height: '100%',
                            // m: 1,
                            p: 2,
                            // bgcolor: '#f5f5f5',
                            // flexGrow: 1,
                        }}
                    >
                        <DateRangePicker    // from, to, setFrom, setTo
                            from={from}
                            to={to}
                            setFrom={setFrom}
                            setTo={setTo}
                        />
                        <IconButton onClick={() => getData()}>
                            <Icon>
                                <BiSearch />
                            </Icon>
                        </IconButton>
                    </Box>

                }
                {
                    data.length > 0 &&
                    <ExportToExcel
                        apiData={formatCsv(data)}
                        fileName={station}
                        station={station}
                        setDownload={setOpenBackdrop}
                        fetching={openBackdrop}
                    />
                }

            </Card>


            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    // width: '100%',
                    // maxWidth: '500px',
                    height: '100%',
                    m: 1,
                    // p: 10,
                    bgcolor: 'background.paper',
                    // flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        // gap: 2,
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        m: 1,
                        p: 1,
                        bgcolor: 'background.paper',
                        // flexGrow: 1,
                    }}
                >
                    <SensorContainer
                        station={station}
                        sensor={'temp'}
                        key={'temp'}
                    />
                    <SensorContainer
                        station={station}
                        sensor={'hum'}
                        key={'hum'}
                    />

                </Box >
            </Container>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            // onClick={() => setOpenBackdrop(false)}
            >
                Obteniendo datos...
                <CircularProgress color="inherit" />
            </Backdrop>

        </Box>
    )
}

export default Dashboard