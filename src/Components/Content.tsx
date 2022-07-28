import React from 'react';
import { getDetail } from '../Api';

export default function Content() {
  return <div>Main Content<button onClick={getDetail}>Get Employees</button></div>;
}
