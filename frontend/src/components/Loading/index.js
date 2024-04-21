import React from "react"
import {bouncy} from 'ldrs';

bouncy.register()

const Loading = ({size}) => {
  return (
    <div>
      <l-bouncy
        size={size}
        speed='1.1'
        color='black'
      ></l-bouncy>
    </div>
  )
};

export default Loading;
