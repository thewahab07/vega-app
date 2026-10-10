import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {scheduleWhenIdle} from '../performance/idleWork';
import {syncFromSharedFolder} from '../sync/syncService';

let lastDiscoveryAt = 0;
const DISCOVERY_INTERVAL_MS = 5 * 60 * 1000;

export const useDownloadsMaintenance = (): void => {
  useFocusEffect(
    useCallback(
      () =>
        scheduleWhenIdle(async () => {
          if (Date.now() - lastDiscoveryAt < DISCOVERY_INTERVAL_MS) return;
          await syncFromSharedFolder().then(() => {
            lastDiscoveryAt = Date.now();
          }).catch(error =>
            console.warn('[VegaSync] Downloads sync failed:', error),
          );
        }, 1500),
      [],
    ),
  );
};
