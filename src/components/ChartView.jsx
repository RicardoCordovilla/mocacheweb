import React, { useEffect } from 'react'
import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'



const ChartView = ({ data, timeRange, screen, xaxis, line_dataKey }) => {

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {


    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);

  }, []);
  return (
    <AreaChart
      width={windowSize[0] - 50}
      height={250}
      data={data}
      margin={{
        // top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={xaxis} />
      <YAxis
      // domain={'temp' ? [0, 50] : [0, 150]}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone"
        dataKey={line_dataKey}
        stroke="#8884d8"
        fillOpacity={0.8}
        fill="url(#colorUv)"
        animationDuration={1000}
        dot={false}
      />
    </AreaChart>
  )
}

export default ChartView