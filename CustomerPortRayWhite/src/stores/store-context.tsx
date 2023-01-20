import React from 'react';
import { enableStaticRendering } from 'mobx-react';
import RootStore from './root-store';
import PropertyStore from './property-store';
import AddressStore from './address-store';
import AppraisalStore from './appraisal-store';


// start register
type CompositeStore = {
  rootStore: RootStore,
  addressStore: AddressStore
  propertyStore: PropertyStore,
  appraisalStore: AppraisalStore
 
};

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(isServer);

// let _stores: null | CompositeStore = null;


//finish register
const initStores = () => {
  const rootStore = new RootStore();
  const initializedStores: CompositeStore = {
    rootStore,
    addressStore: rootStore.addressStore,
    propertyStore: rootStore.propertyStore,
    appraisalStore: rootStore.appraisalStore,
  };
  return initializedStores;
};

export const stores = initStores(); // _stores || initStores();

export const StoreContext = React.createContext(stores);

export const StoreProvider = ({ children }) => <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;