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
    Data:[],
    UnchangeData:[],
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
        Data: jasonObj.customer,
        UnchangeData:jasonObj.customer
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
    Coordinates = data.map(item => item[7])
    return Coordinates;
  }
  changFlag = (bool) => {
    this.setState(
      { Flag: bool }
    )
  }
  setPolygonId = (id) => {
    let Data=this.state.Data.filter(item=>!id.includes(item[0]));
    let Coordinates=Data.map(item=>item[7]);
    this.setState({
      PolygonId: id,
      PolygonFlag: true,
      Data:Data,
      Coordinates:Coordinates
    })
  }
  setPolygonPoints = (id) => {
    let Data=this.state.Data.filter(item=>id!==item[0]);
    let Coordinates=Data.map(item=>item[7]);
    this.setState({
      Data:Data,
      Coordinates:Coordinates
    })
  }
  ResetPolygonPoints=(id)=>{
    let Data=this.state.UnchangeData.filter(item=>id===item[0]);
    let TempCoordinate=Data[0][7];
    this.setState(prevstat =>{
      return({
        Data:[...prevstat.Data,...Data],
        Coordinates:[...prevstat.Coordinates,TempCoordinate]
      })
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
          PolygonFlag={this.state.PolygonFlag}
          setPolygonPoints={this.setPolygonPoints}
          ResetPolygonPoints={this.ResetPolygonPoints}
           />

      </div>
    )
  }
}
export default App;
