export class ApplicationProfile{
    tenantName: string;
    ApplicationProfileName: string;
    Description: string;
   
        
      constructor(tenantName: string, ApplicationProfileName: string, Description: string) {
        this.tenantName = tenantName;
        this.ApplicationProfileName = ApplicationProfileName;
        this.Description = Description;
        
       
      }
    }
    