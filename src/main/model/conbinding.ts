export class ConBinding {
  application_profile_name: string;
  epgName: string;
  provided_contract: string;
  consumed_contract: string;
  
    constructor(application_profile_name: string, epgName: string, provided_contract: string, consumed_contract: string) {
      this.application_profile_name = application_profile_name;
      this.epgName = epgName;
      this.provided_contract = provided_contract;
      this.consumed_contract = consumed_contract;
    }
  }
  