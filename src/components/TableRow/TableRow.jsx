import React from 'react';
import './TableRow.css';

const TableRow = ({ post }) => {
  return (
    <tr className={'row'}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  );
};

export default TableRow;
