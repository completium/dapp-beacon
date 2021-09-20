import React from 'react';
import { useReady, useWallet, useConnect } from '../dappstate';
import { useSettingsContext } from '../settings.js';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { getBeacon } from '../beaconstate';



const WalletButton = (props) => {
  const theme = useTheme();
  const { beacon } = getBeacon();

  const handleConnect = async () => {
    try {
      console.log("Requesting permissions...");
      const permissions = await beacon.wallet.client.requestPermissions();
      console.log("Got permissions:", permissions.address);
    } catch (error) {
      console.log("Got error:", error);
    }
  };

  return (<Button variant="outlined"
            color={theme.palette.text.primary}
            onClick={handleConnect}>
            connect to wallet
          </Button>);
}

export default WalletButton;
