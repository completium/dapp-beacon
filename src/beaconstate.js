import React from 'react';
import constate from 'constate';

import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { useSettingsContext } from './settings.js';

export function useBeacon () {
  const { settings } = useSettingsContext();
  const [beacon, setBeacon] = React.useState({
    wallet: null,
    tezos: null,
  });

  React.useEffect(() => {
    const Tezos = new TezosToolkit(settings.endpoint);
    const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

    Tezos.setWalletProvider(wallet);
    setBeacon({wallet: wallet, tezos : Tezos})
  }, []);

  return {beacon}
}

export const [BeaconProvider, getBeacon] = constate(useBeacon);
