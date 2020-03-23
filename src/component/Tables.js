import React from "react";
import ShowPanel from './ShowPannel';
import DeliveredOrders from './DeliveredOrders';
let PanelHeader, DelivereddHeader;
class Tables extends React.Component {
    state = {
      PanelHeadercolumns: [],
      PanelDatacolumns: this.props.Datacolumns,
      DeliveredHeaderColumns: [],
      DeliveredDataColumns: []
  }
  findRow=(id)=> {
    var row = this.state.PanelDatacolumns.find(element => element.Id === id)
    return row
  }

  creatPanelHeader=()=> {
    let Column = [
      {
        name: "Id",
        selector: "Id",
        sortable: true,
      },
      {
        name: "InvoiceId",
        selector: "InvoiceId",
        sortable: true,
      },
      {
        name: "InvoiceNumber",
        selector: "InvoiceNumber",
        sortable: true,
      },
      {
        name: "Total Fee",
        selector: "Total Fee",
        sortable: true,
      },
      {
        name: "Postcode",
        selector: "Postcode",
        sortable: true,
      },
      {
        name: "Address",
        selector: "Address",
        sortable: true,
      },
      {
        name: "CustomerName",
        selector: "CustomerName",
        sortable: true,
      },
      {
        name: 'Add',
        button: true,
        cell: row => <button type="button" className="iconbtn" onClick={() => {
          this.addRowToDelivered(row);
          this.RemovePanelRow(row.Id)
        }}>
          <i className="material-icons">add_circle_outline</i>
          </button>,
      }
    ];
    return Column;
  }
  creatDeliveredHeader=()=> {
    let Column = [
      {
        name: "Id",
        selector: "Id",
        sortable: true,
      },
      {
        name: "InvoiceId",
        selector: "InvoiceId",
        sortable: true,
      },
      {
        name: "InvoiceNumber",
        selector: "InvoiceNumber",
        sortable: true,
      },
      {
        name: "Total Fee",
        selector: "Total Fee",
        sortable: true,
      },
      {
        name: "Postcode",
        selector: "Postcode",
        sortable: true,
      },
      {
        name: "Address",
        selector: "Address",
        sortable: true,
      },
      {
        name: "CustomerName",
        selector: "CustomerName",
        sortable: true,
      },
      {
        name: 'Delete',
        button: true,
        cell: row => <button type="button" className="iconbtn" onClick={() => {
          this.addRowToPannel(row);
          this.RemoveDeliveredRow(row.Id)
        }}><i className="material-icons">delete</i></button>,
      }
    ];
    return Column;
  }

  RemovePanelRow=(id)=> {
    this.setState(prevstat => {
      let newstate = prevstat.PanelDatacolumns.filter(item => item.Id !== id)
      return ({ PanelDatacolumns: newstate })
    }
    )
  }
  RemoveDeliveredRow=(id)=> {
    this.setState(prevstat => {
      const newstate = prevstat.DeliveredDataColumns.filter(item => item.Id !== id)
      return ({ DeliveredDataColumns: newstate })
    }
    )
  }
  addRowToDelivered=(row)=> {
    this.setState(prevState => { return ({ DeliveredDataColumns: [...prevState.DeliveredDataColumns, row] }) }
    )
  }
  addRowToPannel=(row)=> {
    this.setState(prevState => { return ({ PanelDatacolumns: [...prevState.PanelDatacolumns, row] }) }
    )
  }
  componentDidMount=()=> {
    PanelHeader = this.creatPanelHeader();
    DelivereddHeader = this.creatDeliveredHeader();
    this.creatDeliveredHeader();
    this.setState(
      {
        PanelHeadercolumns: PanelHeader,
        DeliveredHeaderColumns: DelivereddHeader
      }
    )
  }
  setDatacolumn=()=>{
    this.setState(
      {
        PanelDatacolumns: this.props.Datacolumns
      }
    )
  }
  componentDidUpdate=()=>{
    if (this.props.Flag) {
      this.setDatacolumn();
      this.props.handler(false);
    }
    if (this.props.PolygonId.length > 0 && this.props.PolygonFlag) {
      this.props.PolygonId.forEach(element => {
        var row = this.findRow(element);
        this.RemovePanelRow(element);
        this.addRowToDelivered(row)
      });
      this.props.setPolygonFlag();
    }
  }
  render() {
    return (
      <div>
        <ShowPanel
          Headers={this.state.PanelHeadercolumns}
          Data={this.state.PanelDatacolumns}
        />
        <DeliveredOrders
          Headers={this.state.DeliveredHeaderColumns}
          Data={this.state.DeliveredDataColumns}
        />
      </div>
    )
  }
}
export default Tables