import axios from 'axios';
import { Axios } from '../utilities/network';
import RootStore from './root-store';
import {
  action, computed, observable, runInAction, toJS, makeObservable,
} from 'mobx';

export default class AppraisalStore {
  // create list for result
  loading: boolean = false;
  newAppraisal: any = {};
  constructor(rootStore: RootStore) {
    makeObservable(this, {
    //loading: observable,
     newAppraisal: observable,
     
      CreateAppraisal: action,
     
    });
  }


  CreateAppraisal = async (reqModel: any) => {
    try {
        
     this.loading = true;
     console.log("test");
      const res = await Axios.post(`/Appraisal/CreateAppraisal`, reqModel);
      
      this.newAppraisal = res.data;
      console.log("appraisal Info", res.data);
     
    }  catch (err) {
      return Promise.reject(err);
    }finally {
     
      this.loading = false;
    }
  }
 

    
}