import React, { useEffect, useState } from 'react'
import ChartView from './ChartView'
import { config } from '../config'
import axios from 'axios'
import { digits, formatDate, nowDate, nowTime } from '../utils/dateformat'
import RangeSelectorTabs from './RangeSelector'
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'


const ChartContainer = ({ station, sensor, setListData }) => {

    console.log(station)

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [timeRange, setTimeRange] = useState('00:00-23:59')
    const [tab, setTab] = useState('1D') // ['1D', '7D', '15D', '1H'
    const [from, setFrom] = useState('2023-10-10')
    const [to, setTo] = useState('2023-10-10')
    const [timeOdd, setTimeOdd] = useState(1)


    const getData = async () => {
        let url = config.db.baseurl + 'registers/' + 'ESP1' + '/date?'
            + 'from=' + (from)
            + '&to=' + (to)

        console.log(url)

        let res = await axios.get(url)
        // console.log(res.data)
        setData(res.data)
        setFilteredData(res.data)
        setListData(res.data)
    }

    const handleTimeRange = (e) => {
        console.log(e)
        let toTime
        let fromTime
        switch (e) {
            case '1H':
                setFrom(nowDate())
                setTo(nowDate())
                setTimeRange(fromTime + ':00' + '-' + toTime + ':00')
                break;
            case '1D':
                toTime = '23:59'
                fromTime = '00:00'
                // toTime = nowTime().split(':')[0] + ':' + nowTime().split(':')[1]
                // fromTime = (nowTime().split(':')[0] - 1) + ':' + nowTime().split(':')[1]  // 1 hour before
                setTimeRange(fromTime + '-' + toTime)
                setFrom(nowDate().split('-')[0] + '-' + nowDate().split('-')[1] + '-' + nowDate().split('-')[2])
                setTo(nowDate().split('-')[0] + '-' + nowDate().split('-')[1] + '-' + nowDate().split('-')[2])
                break;

            case '7D':
                toTime = '23:59'
                fromTime = '00:00'
                toTime = nowTime().split(':')[0] + ':' + nowTime().split(':')[1]
                fromTime = (nowTime().split(':')[0] - 1) + ':' + nowTime().split(':')[1]  // 1 hour before
                setTimeRange(fromTime + '-' + toTime)
                setFrom(nowDate().split('-')[0] + '-' + nowDate().split('-')[1] + '-' + digits((nowDate().split('-')[2] - 7)))  // 7 days before    
                setTo(nowDate().split('-')[0] + '-' + nowDate().split('-')[1] + '-' + nowDate().split('-')[2])  // 7 days before    
                break;



            default:
                break;

        }
    }

    const filterDataByTimeRange = (data) => {
        let [from, to] = timeRange.split('-')
        // console.log(from, to)
        let filteredData = data.filter((item) => {
            return item.time >= from && item.time <= to
        })
        return filteredData
    }

    const filterDataByTimeOdd = (data) => {
        let filteredData = data.filter((item, index) => {
            return index % timeOdd === 0
        })
        return filteredData
    }



    useEffect(() => {
        getData()
    }, [from, to])

    useEffect(() => {
        setFilteredData(filterDataByTimeRange(data))
    }, [timeRange])

    useEffect(() => {
        setFilteredData(filterDataByTimeOdd(data))
    }, [timeOdd])


    return (
        <Card Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: '100%',
                p: 1,
                bgcolor: 'background.paper',
                // flexGrow: 1,
            }
            }
        >
            <Typography variant="h6" component="div" sx={{ textAlign: 'left', alignSelf: 'flex-start' }}>
                {
                    sensor === 'temp' ? 'Temperatura (°C)' : 'Humedad (%)'

                }
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                m: 1,
                p: 1,
                bgcolor: 'background.paper',
                width: '100%',
                flexGrow: 1,
            }}
            >
                <RangeSelectorTabs
                    handleTimeRange={handleTimeRange}
                    setTab={setTab}
                />
                <FormControl
                    sx={{
                        m: 1,
                        width: '100%',
                        // minWidth: '100px',
                        // flexGrow: 1,
                    }}
                // variant="standard"

                >
                    <InputLabel id="demo-simple-select-label">Rango</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={timeOdd}
                        label="Age"
                        onChange={(e) => setTimeOdd(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value={1}>5min</MenuItem>
                        <MenuItem value={3}>15min</MenuItem>
                        <MenuItem value={6}>30min</MenuItem>
                        <MenuItem value={12}>1H</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <ChartView
                data={filteredData}
                timeRange={timeRange}
                screen={[550, 100]}
                xaxis={"time"}
                line_dataKey={sensor}
            />
        </Card >

    )
}

export default ChartContainer