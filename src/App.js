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
    // let requestURL = 'https://api.myjson.com/bins/dig0m'
    // let request = new XMLHttpRequest();
    // request.open('GET', requestURL);
    // request.responseType = 'json';
    // request.send();
    // request.onload = () => {
    //   jasonObj = request.response;
    //   this.Data = this.createData(jasonObj.customer);
    //   this.Coordinates = this.createCoordinates(jasonObj.customer);
    //   this.setState({
    //     Datacolumns: this.Data,
    //     Flag: true,
    //     Coordinates: this.Coordinates,
    //     Data: jasonObj.customer,
    //     UnchangeData:jasonObj.customer
    //   })
    //}
    jasonObj ={"customer":[
      [32,411,511,500,3205,"306/28 bank street","Olivia Smith",[144.969262,-37.831504]],
    [33,412,512,700,3057,"brunswick east","Ava Anderson",[144.975234,-37.768504]],
    [34,413,513,300,3006,"153/88 southbank Blvd","Henry Walker",[144.964714,-37.822837]],
    [35,414,514,550,3141,"8 Garden st, South Yarra bank street","Sara Taylor",[144.961083,-37.833968]],
    [36,415,515,1300,1312,"100 Swan St,Richmond","Thomas King",[144.993316,-37.825208]],
    [37,416,516,1800,3109,"Celest St,Doncaster East","Emily Lee",[145.152167,-37.785907]],
    [38,417,517,900,3109,"Beverley St,Doncaster East","Lucas Brown",[ 145.161570,-37.790986]],
    [39,418,518,6100,3109,"29/1 Meryl St,Doncaster East","Aria Wilson",[ 145.150030,-37.794956]]]};
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
  createData = (data) => {
    console.log(data);
    
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
    console.log(Data)
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
