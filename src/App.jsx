import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate, useParams } from 'react-router-dom'
import ChartContainer from './components/ChartContainer'
import { Box, Container, Divider } from '@mui/material'
import SensorContainer from './components/SensorContainer'

const station = 'ESP1'

function App() {

  const { station } = useParams()
  console.log(station)
  // const navigate = useNavigate()


  return (
    <div className="App">
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
            gap: 2,
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
    </div>
  )
}

export default App
