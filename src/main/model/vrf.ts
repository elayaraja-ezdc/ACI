export class Vrf{
  vrfName: string;
  pControlEnforcementPref: string;
  pControlEnforcementDir: string;
  tenantName:string
      
    constructor(vrfName: string, pControlEnforcementPref: string, pControlEnforcementDir: string,tenantName:string) {
      this.vrfName = vrfName;
      this.pControlEnforcementPref = pControlEnforcementPref;
      this.pControlEnforcementDir = pControlEnforcementDir;
      this.tenantName = tenantName;
     
    }
  }
  