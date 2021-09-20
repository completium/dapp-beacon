import './App.css';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { DAppProvider } from './dappstate';
import { SnackProvider } from './snackstate';
import { appName, alegreya, courier } from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';
import { SettingsPanel } from './components/Settings';

import { TezosToolkit } from '@taquito/taquito';
import { SettingsProvider, useSettingsContext } from './settings.js';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';
import { BeaconProvider, getBeacon } from './beaconstate';
import { DAppClient, TezosOperationType, SigningType } from "@airgap/beacon-sdk";
import { packDataBytes } from '@taquito/michel-codec';

/* FIXME: Step 3.1 */
const BidButton = () => {
  const { beacon } = getBeacon();


// At this point we are connected to an account.
// Let's send a simple transaction to the wallet that sends 1 mutez to ourselves.


  // const tezos = beacon.tezos;
  const wallet = beacon.wallet;
  // const account = beacon.wallet;
  // const { settings } = useSettingsContext();
  // const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const bid = async () => {
    try {
      const pkh = await wallet.getPKH();
      console.log(`pkh: ${pkh}`);

      const input = {
        "prim": "Pair",
        "args": [
          {"int": "0"},
          {"string": "archetype"}
        ]
      };

      const ityp = {
        "prim": "pair",
        "args": [
          {"prim": "nat"},
          {"prim": "string"}
        ]
      };

      const data = packDataBytes(input, ityp);

      const response = await wallet.client.requestSignPayload({
        signingType: SigningType.MICHELINE,
        payload: data.bytes,
      });

      const output = JSON.stringify(response, 0, 2);
      console.log(`output: ${output}`);

      // hideSnack();
    } catch (error) {
      // setErrorSnack(error.message);
      // setTimeout(hideSnack, 4000);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined">
      test wallet
    </Button>);
}

/* FIXME: step 4.1 */

/* FIXME: Step 6.1 */

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <DAppProvider appName={ appName }>
    <SettingsProvider>
    <BeaconProvider>
    <SnackProvider>
      <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            { /* FIXME: Step 3.2 Start */ }
            <Grid item xs={12}>
              <Typography variant="h2" style={{ fontFamily : alegreya }}>
                Completium
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Edit <code>src/App.js</code> and save to reload.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                href="https://completium.com/dapps"
                target="_blank" rel="noopener noreferrer"
                style={{ color: theme.palette.primary.light }}
              >
                <Typography variant="h6">
                  Learn everything about DApps
                </Typography>
              </Link>
            </Grid>
            { /* FIXME: Step 3.2 End */ }

            { /* FIXME: Step 4.2 */ }

            { /* FIXME: Step 6.2 */ }

            { /* FIXME: Step 4.3 */ }
            <Grid item xs={12}> <WalletButton /> </Grid>
            <Grid item xs={12}> <BidButton /> </Grid>

          </Grid>
        </Container>
      </div>
      <SettingsPanel/>
      <Snack />
      </ThemeProvider>
    </SnackProvider>
    </BeaconProvider>
    </SettingsProvider>
    </DAppProvider>
  );
}

export default App;
