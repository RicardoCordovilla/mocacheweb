import { Tab, Tabs } from '@mui/material';
import React from 'react';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

export default function RangeSelectorTabs({ handleTimeRange, setTab }) {
    // const classes = useStyles();
    const [value, setValue] = React.useState('1D');

    const handleChange = (event, newValue) => {
        // console.log(newValue)
        setValue(newValue);
        setTab(newValue)
        handleTimeRange(newValue)
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // width: 'auto',
                // maxWidth: '300px',
                // width: '100%',
                // minWidth: '100px',
                // maxWidth: '500px',
                // flexGrow: 10,
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                // centered
                sx={{
                    margin: '5px',
                }}
            >
                {/* <Tab label="15d"
                    value={'15D'}
                /> */}
                <Tab label="7D"
                    value={'7D'}
                />
                <Tab label="1D"
                    value={'1D'}
                />
                <Tab label="1H"
                    value={'1H'}
                />
            </Tabs>
        </div >
    );
}
