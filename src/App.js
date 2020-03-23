import React from "react";
import Tables from './component/Tables'
import Map from './component/map'
class App extends React.Component {

  state = {
    Datacolumns: [],
    Flag: false,
    Coordinates: [],
    PolygonId: [],
    PolygonFlag: false,
    viewport: {
      width: 800,
      height: 400,
      zoom: 8
    }
  }
  loadTable() {
    let jasonObj;
    let requestURL = 'https://api.myjson.com/bins/dig0m'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      jasonObj = request.response;
      this.Data = this.createData(jasonObj.customer);
      this.Coordinates = this.createCoordinates(jasonObj.customer);
      this.setState({
        Datacolumns: this.Data,
        Flag: true,
        Coordinates: this.Coordinates,
        Data: jasonObj.customer
      })
    }
  }
  createData = (data) => {
    let Data = [];
    Data = data.map(item => {
      return (

        {
          "Id": item[0],
          "InvoiceId": item[1],
          "InvoiceNumber": item[2],
          "Total Fee": item[3],
          "Postcode": item[4],
          "Address": item[5],
          "CustomerName": item[6]
        }
      )
    }
    )
    return Data;
  }

  createCoordinates = (data) => {
    let Coordinates = [];
    Coordinates = data.map(item => {
      return (
        item[7]
      )
    }
    )
    return Coordinates;
  }
  changFlag = (bool) => {
    this.setState(
      { Flag: bool }
    )


  }
  setPolygonId = (id) => {
    this.setState({
      PolygonId: id,
      PolygonFlag: true
    })
  }
  setPolygonFlag = () => {
    this.setState(
      { PolygonFlag: false }
    )
  }
  componentDidMount() {
    this.loadTable();
  }
  render() {

    return (
      <div>
        <Map Coordinates={this.state.Coordinates}
          Data={this.state.Data}
          setPolygonId={this.setPolygonId}
        />
        <Tables Datacolumns={this.state.Datacolumns}
          Flag={this.state.Flag}
          handler={this.changFlag}
          PolygonId={this.state.PolygonId}
          setPolygonFlag={this.setPolygonFlag}
          PolygonFlag={this.state.PolygonFlag} />

      </div>
    )
  }
}
export default App;
