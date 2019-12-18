import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './Navbar';
import FightField from './FightField';
import LoginBlock from './LoginBlock';

import TRUFFLE from '../config/MyERC20.json';
import './App.css';

const App = () => {
  const [addr, setAddr] = useState('');
  const [token, setToken] = useState(0);
  const [stake, setStake] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [enemy, setEnemy] = useState(-1);
  const [isLogin, setLogin] = useState(false);

  const ContractAddr = '__YOUR_CONTRACT_ADDRESS';
  let Provider = null, Contract = null;

  useEffect(() => {
    if (addr === '') {
      setLogin(false);
    }
  }, [addr]);

  useEffect(() => {
    initialize();
    // get token
    const timer = setInterval(async () => {
      if (addr === '') return;
      ////////////////////
      // get your token //
      ////////////////////
    }, 1000);
    // get event
    //////////////////////////
    // get event for result //
    //////////////////////////
    // clear
    return () => clearInterval(timer);
  });

  const handleClearData = (event) => {
    event.preventDefault();
    setAddr('');
    setToken(0);
  };
  const handleSetAddress = (in_addr) => {
    setAddr(in_addr);
    setLogin(true);

  };
  const handleSetStake = (stake) => setStake(stake);
  const handleSetSelect = async (select) => {
    setSelected(select);
    if (selected === -1) return;
    await Contract.methods.mora(selected, stake).send({ from: addr })
      .catch((err) => console.error(err))
      .then((receipt) => {
        console.info(`Mora!! => you ${selected}`);
        console.info(`tx: ${receipt.transactionHash}`)
        setSelected(-1);
        return receipt.transactionHash;
      });
  };

const initialize = async () => {
  //////////////
  // provider //
  //////////////
  //////////////
  // contract //
  //////////////
};

return (
  <div className="contain">
    {
      (isLogin) ? (<></>) : (
        <LoginBlock
          handleAddress={handleSetAddress}
        />
      )
    }
    <Navbar
      address={addr}
      token={token}
      clearData={handleClearData}
    />
    <FightField
      handleStake={handleSetStake}
      selected={selected}
      enemy={enemy}
      handleSelect={handleSetSelect}
    />
  </div>
);
};

export default App;