import axios from 'axios';
import { Axios } from '../utilities/network';
import RootStore from './root-store';
import {
  action, computed, observable, runInAction, toJS, makeObservable,
} from 'mobx';

export default class AddressStore {
  // create list for result
  addressList: any[] = [];
  addressById: any[] = [];
  newProperty: any = {}
  constructor(rootStore: RootStore) {
    makeObservable(this, {
      addressList: observable,
      addressById: observable,
      newProperty: observable,
      getAddressList: action,
      getAddressById: action,
      CreateNewProperty: action,
    });
  }
  getAddressList = async () => {
    try {
      const res = await Axios.get(`/Address/ListAddress`);
      this.addressList = res.data;
      console.log("Address List", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // do nothing
    }
  }
  getAddressById = async (propertyId: number) => {
    try {
      const res = await Axios.get(`/Address/GetByPropertyId?propertyId=${propertyId}`);
      this.addressById = res.data;
      console.log("Address By Id", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // do nothing
    }
  }
  CreateNewProperty = async (reqModel: any) => {
    try {
      // this.loading = true;
      const res = await Axios.post(`/Address/CreateNewProperty`, reqModel);
      this.newProperty = res.data;
      console.log("Address Info", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // this.loading = false;
    }
  }
}