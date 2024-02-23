import { Switch } from '@/@types';
import React, { useState } from 'react';

function Switch({ defaultValue, enabled, setEnabled, handleClick }: Switch) {
  return (
    <div
      className={`w-[2.44rem] h-6 ${
        enabled ? 'bg-primary-100' : 'bg-Grey-G50'
      } rounded-xl flex items-center cursor-pointer`}
      onClick={() => handleClick()}
    >
      <div className={`${enabled ? 'bg-primary-100' : 'bg-white-N0'} w-[21px] h-[21px] rounded-full`}></div>
      <div className={`${enabled ? 'bg-white-N0' : 'bg-Grey-G50'} w-[21px] h-[21px] rounded-full`}></div>
    </div>
  );
}

export default Switch;
