import { Card, Typography } from '@mui/material'
import React from 'react'

const CurrentValueView = ({ filteredData, sensor }) => {
    console.log(filteredData)
    return (
        <Card 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                width: '90%',
                height: '100%',
                m: 1,
                bgcolor: 'background.paper',
                flexGrow: 1,
            }}
        >
            <Typography variant="h6" component="div"
                sx={{
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    width: '100%',
                }}
            >
                Valor actual {sensor === 'temp' ? 'Temperatura (°C)' : 'Humedad (%)'}
            </Typography>
            <Typography variant="h2" component="div"
                sx={{
                    p:5,
                    textAlign: 'center',
                    alignSelf: 'center',
                    width: '100%',
                }}
            >
                {filteredData[filteredData?.length - 1]?.[sensor]}
                {sensor === 'temp' ? '°C' : '%'}
            </Typography>
        </Card>
    )
}

export default CurrentValueView