import axios from 'axios';
import { Axios } from '../utilities/network';
import RootStore from './root-store';
import {
  action, computed, observable, runInAction, toJS, makeObservable,
} from 'mobx';


export default class PropertyStore {
  // create list for result
  loading: boolean = false;
  propertyList: any[] = [];
  filteredPropertyList: any[] = [];
  propertyDetail: any = [];
  //constructor
  constructor(rootStore: RootStore) {
    makeObservable(this, {
      // propertyId: observable,
      // title: observable,
      // description: observable,
      // displayText: observable,
      loading: observable,
      propertyList: observable,
      filteredPropertyList: observable,
      propertyDetail: observable,
      getPropertyList: action,
      createProperty: action,
      getFilteredProperty: action,
      getPropertyDetail: action,

    });

    //this.rootStore = rootStore;
  }
  getPropertyList = async () => {
    this.loading = true;
    try {
      const res = await Axios.get(`/Property/ListAllProperties`);
      this.propertyList = res.data;
      console.log("Property List", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // do nothing
      this.loading = false;
    }
  }
  createProperty = async (reqModel: any) => {
    try {
      const res = await Axios.post(`/Property/CreateProperty`, reqModel);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // this.loading = false;
    }
  }
  getPropertyDetail = async (propertyId: number, saleStatus: number) => {
    try {
      const res = await Axios.get(`/Property/GetPropertyDetail?propertyId=${propertyId}&saleStatus=${saleStatus}`);
      this.propertyDetail = res.data;
      console.log("Property Detail", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // do nothing
    }
  }
  getFilteredProperty = async (reqModel: any) => {
    try {
      const res = await Axios.post(`/Property/GetFilteredProperty`, reqModel);
      this.filteredPropertyList = res.data;
      console.log("Filtered Property List", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      // do nothing
    }
  }


   getDetailProperty = async (reqModel: any) => {
    try {
      const res = await Axios.post(`/Property/GetPropertyDetail`, reqModel);
      this.filteredPropertyList = res.data;
      console.log("Filtered Property List", res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      
    }
  }


  //====== delete request example ============
  // getFilteredProperty = async (inspectionId: number) => {
  //   try {
  //     const res = await Axios.delete(`/Property/GetFilteredProperty?inspecitonId=${inspectionId}`);
  //     this.filteredPropertyList = res.data;
  //     console.log("Filtered Property List", res.data);
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   } finally {
  //     // do nothing
  //   }
  // }
  // =======================

  // getPropertyTypes = async (saleStatus : SaleStatus) => {
  //   try {
  //     const res = await Axios.get(`http://realestateadminapi.auokka.com/Property/GetPropertyTypes`);
  //     this.agentList = res.data;
  //     console.log("Property List", res.data);
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   } finally {
  //     // do nothing
  //   }
  // }

}