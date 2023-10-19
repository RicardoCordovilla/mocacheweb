import { Box, Stack } from '@mui/material'
import React from 'react'

const DateRangePicker = ({ from, setFrom, to, setTo }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                m: 1,
                p: 1,
                gap: 2,
                bgcolor: 'background.paper',
                width: '70%',
                flexGrow: 1,
            }}
        >
            <Stack direction="column" spacing={0}
                sx={{
                    flexGrow: 1,

                }}
            >
                <label htmlFor="">Desde</label>
                <input type="date"
                    style={{
                        padding: '0.5rem',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
            </Stack>

            <Stack direction="column" spacing={0}
                sx={{
                    flexGrow: 1,
                }}
            >
                <label htmlFor="">Hasta</label>
                <input type="date"

                    style={{
                        padding: '0.5rem',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </Stack>
        </Box>

    )
}

export default DateRangePicker