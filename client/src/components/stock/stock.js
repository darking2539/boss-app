import React, { Component } from "react";
import * as actions from './../../actions/stock.action'
import { connect } from 'react-redux'
import _ from 'lodash'

class Stock extends Component {
  
  componentDidMount(){
    this.props.getProducts()
    this.debounceSearch = _.debounce(this.props.getProductByKeyword,500)
  }
  
  constructor(props) {
    super(props)
    this.state = {
      DevAddr: "",
      data: [],
      para: [],
      Filter: ""
    }

  }


   
  onChange = (e) => {
    e.persist()
    this.debounceSearch(e)
  }
  
  renderRows = () => {
    const {result} = this.props.stockReducer
    let num = 1;
    console.log(result)
    if (result != null){
    return result.map((d) => (
      <tr>
          <th scope="row">{num++}</th>
          <td>{d.Time}</td>
          <td style={{ color: "red" }}>{d.DevAddr}</td>
          <td>{d.DevEUI}</td>
          <td style={{ color: "blue" }}>{d.payload_hex}</td>
          <td>{d.FPort}</td>
          <td>{d.FCntUp}</td>
          <td>{d.FCntDn}</td>
          <td>{d.LrrRSSI}</td>
          <td>{d.LrrSNR}</td>
          <td>{d.SubBand}</td>
          <td>{d.Channel}</td>
          <td>{d.Lrrid}</td>
          <td>{d.LrrLAT}</td>
          <td>{d.LrrLON}</td>
      </tr>
    ));
  }};

  render() {
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="col-xs-6">
                      <input
                        onChange={this.onChange}
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search by DevEUI"
                        style={{ borderRadius: 20 , marginTop: 10, marginBottom: 10 }} 
                      />
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <table
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>DevAddr</th>
                        <th>DevEUI</th>
                        <th>Payload_Hex</th>
                        <th>FPort</th>
                        <th>FCntUp</th>
                        <th>FCntDn</th>
                        <th>RSSI</th>
                        <th>SNR</th>
                        <th>SubBand</th>
                        <th>Channel</th>
                        <th>LRR ID</th>
                        <th>LRR LAT</th>
                        <th>LRR LON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderRows()}
                    </tbody>
                  </table>
                </div>
                {/* /.box-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer }) => ({
  stockReducer
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock);