import React from 'react';
import DataTable from 'react-data-table-component';
// const ExpanableComponent = <i class="material-icons">add_box</i>;
const customStyles = {
  header:{
    style: {
    // marginTop:'10px',
      backgroundColor: '#B3FF6F',
    },
  },
  rows: {
    style: {
      minHeight: '25px',
    },
    highlightOnHoverStyle: {
      // color: '#ffffff',
      backgroundColor: '#B3FF6F',
    },
    stripedStyle: {
      '&:nth-child(odd)': {
        backgroundColor: '#CDD6C5',

      },
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '16px'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',

    },
  },
};
function ShowPanel(props) {
  return (
    <div>
      <DataTable
        title="Orders"
        columns={props.Headers}
        data={props.Data}
        keyField='Id'
        defaultSortField="Id"
        customStyles={customStyles}
        highlightOnHover={true}
        pointerOnHover={true}
      />
    </div>

  )
}
export default ShowPanel