import React, { Component } from "react"
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

class OrderAreaChart extends Component {


  render(){
    let data = []

    if(this.props.orders[0]){
      let bids = this.props.orders[0]
      Object.keys(bids).forEach(function(price){
        let totalVol = 0
        Object.keys(bids[price].volumes).forEach((exchangeName) => {
          totalVol += bids[price].volumes[exchangeName]
        })
        data.push({price: + price, bid: totalVol})
      })

      let asks = this.props.orders[1]
      Object.keys(asks).forEach(function(price){
        let totalVol = 0
        Object.keys(asks[price].volumes).forEach((exchangeName) => {
          totalVol += asks[price].volumes[exchangeName]
        })
        data.push({price: + price, ask: totalVol})
      })
    }

    data.sort(function (a, b) {
      return a.price - b.price
    })

    const data1 = [
      {price: .03, bid: 4000, ask: 0},
      {price: .04, bid: 3000, ask: 0},
      {price: .05, bid: 3000, ask: 0},
      {price: .06, bid: 2000, ask: 0},
      {price: .075, bid: 9000},
      {price: .08, bid: 0, ask: 4800},
      {price: .09, ask: 3800},
      {price: .1, ask: 4300},
    ]
    console.log(data)
    return(

      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={.5}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="price" type="number" allowDataOverflow={true} domain={[.039, .041]} />
        <YAxis allowDataOverflow={true} domain={[0, 100]}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="ask" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" connectNulls={true} />
        <Area type="monotone" dataKey="bid" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" connectNulls={true} />
      </AreaChart>
    )
  }

}

export default OrderAreaChart
