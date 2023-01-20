import { observable, action, makeObservable } from 'mobx';
import AddressStore from './address-store';
import PropertyStore from './property-store';
import AppraisalStore from './appraisal-store';


interface WebNotification {
  message: string,
  options?:
  {
    variant: 'success' | 'error' | 'info' | 'warning'
  },
}

export default class RootStore {
  testVal = 'TEST_VALUE';

  destination = 'Select';

  notification: WebNotification = {
    message: "",
    options: {
      variant: "info"
    }
  }

  propertyStore;
  addressStore;
  appraisalStore;
 

  constructor() {
    makeObservable(this, {
      testVal: observable,
      destination: observable,
      notification: observable,
      notify: action,
    });
    this.propertyStore = new PropertyStore(this);
    this.addressStore = new AddressStore(this);
    this.appraisalStore = new AppraisalStore(this);
  }

  notify(msg: string, level?: 'success' | 'error' | 'info' | 'warning') {
    if (level) {
      this.notification = {
        message: msg,
        options: {
          variant: level,
        },
      };
    } else {
      this.notification = {
        message: msg,
      };
    }
  }
}
