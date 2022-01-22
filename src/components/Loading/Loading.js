import React, { useContext } from 'react'
import './styles.scss'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { Context } from 'Context'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading() {
  const { loading, updateLoadingStatus } = useContext(Context);

  return loading ? (
    <div className="loading-mask">
      <ClipLoader color={'#ffffff'} loading={loading} size={35} />
    </div>
  ) : null
}

export default Loading;