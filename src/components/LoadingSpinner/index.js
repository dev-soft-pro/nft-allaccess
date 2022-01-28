import React from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import './styles.scss'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingSpinner(props) {
  const { loading } = props;
  return (
    <ClipLoader color={'#ffffff'} loading={loading} size={35} />
  )
}