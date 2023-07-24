import React from 'react';
import './TableRow.css';

const TableRow = ({ post }) => {
  return (
    <tr className={'row'}>
      <td className={'row__sector row__sector-id'}>{post.id}</td>
      <td className={'row__sector'}>{post.title}</td>
      <td className={'row__sector'}>{post.body}</td>
    </tr>
  );
};

export default TableRow;
