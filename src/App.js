import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import OrderTable from './components/OrderTable'

class App extends Component {
  constructor() {
    super()
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8080",
      orders: {},
      exchanges: ["Bittrex", "Poloniex"]
    }
  }
  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("orders", data => this.setState({ orders: data }))
  }
  render() {
    return (
      <div>
      <div class="container">
        <h1 class = "text-center">Combined Order Books</h1><br></br>
        <h3 class = "text-center">BTC-ETH</h3><br></br>
        <div class="col-md-6 offset-md-3">

        <h5 class = "text-center font-italic bg-warning">Highlighting Represents Overlapping Asks/Bids</h5><br></br>
      </div>

        <div class="row">
          <div class="col-md-6">
            <h3 class = "text-center">Bids</h3>
            <OrderTable type="bids" orders={this.state.orders[0]}/>

          </div>
          <div class="col-md-6">
            <h3 class = "text-center">Asks</h3>
            <OrderTable type="asks" orders={this.state.orders[1]}/>

          </div>
        </div>
      </div>
    </div>

    )
  }
}
export default App;
