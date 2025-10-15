import React from 'react';
const ErrorMessage = ({ message }: { message: string }) => (
  <div style={{color:'red',textAlign:'center',margin:'1em 0'}}>{message}</div>
);
export default ErrorMessage;