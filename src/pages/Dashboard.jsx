import { Box, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import SensorContainer from '../components/SensorContainer'
import { useNavigate, useParams } from 'react-router-dom'

const Dashboard = () => {

    const { station } = useParams()
    console.log(station)
    const navigate = useNavigate()


    return (
        <Box
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
        </Box>
    )
}

export default Dashboard