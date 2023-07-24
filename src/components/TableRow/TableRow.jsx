import React from 'react';

const TableRow = ({ post }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  );
};

export default TableRow;
