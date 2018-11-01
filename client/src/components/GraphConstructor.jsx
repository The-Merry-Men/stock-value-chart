import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, ReferenceLine, Tooltip } from 'recharts';
import CustomToolTip from './CustomToolTip.jsx';
import styles from '../styles/GraphConstructor.css';

const GraphConstructor = (props) => (

  <ResponsiveContainer className={styles.chart} width='100%' height='100%'>

    <LineChart onMouseMove={(e) => {props.priceHover(e) }} onMouseLeave={() => {props.priceReset()}} className="chart" width={document.getElementById('App').clientWidth} height={document.getElementById('App').clientHeight * 6 / 10} >

      <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
      <XAxis dataKey="id" type="number" domain={[0, 78]} hide={true} />
      <Tooltip content={<CustomToolTip/>}/>
      <ReferenceLine y={props.openingPrice} stroke="black" strokeDasharray="1 8"/>
      <Line type="monotone" dataKey="price" data={props.data} width={1} stroke="#30CD9A" dot={false}/>

    </LineChart>

  </ResponsiveContainer>

);

export default GraphConstructor;