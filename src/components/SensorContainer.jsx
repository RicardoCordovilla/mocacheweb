import { Box } from '@mui/material'
import React, { useState } from 'react'
import ChartContainer from './ChartContainer'
import CurrentValueView from './CurrentValueView'


const SensorContainer = ({ station, sensor }) => {

    const [filteredData, setFilteredData] = useState([])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                // width: '100%',
                maxWidth: '700px',
                height: '100%',
                m: 1,
                bgcolor: 'background.paper',
                // flexGrow: 1,
            }}
        >
            <ChartContainer
                station={station}
                sensor={sensor}
                setListData={setFilteredData}
            />

            <CurrentValueView
                filteredData={filteredData}
                sensor={sensor}
            />

        </Box>
    )
}

export default SensorContainer