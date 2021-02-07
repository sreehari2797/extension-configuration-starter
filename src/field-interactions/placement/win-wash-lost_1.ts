const interaction: FieldInteraction = {
    fieldName: 'status',
    name: 'win-wash-lsot',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        init: () => {
          
          const placementId = API.currentEntityId;
          
          const oldstatus = API.appBridge.httpGET('/entity/Placement/${API.currentEntityId}?fields=status')

          if(oldstatus!= 'Approved' && status==='Approved') {
            return API.appBridge.httpGET('/entity/Placement/${API.currentEntityId}?fields=jobOrder(id,customInt3,numOpenings)').then(response => {
                
                API.setValue('customInt3',response.jobOrder.customInt3 + 1);
                if (response.jobOrder.numOpenings >= 0)
                {
                    API.setValue('numOpenings',response.jobOrder.numOpenings - 1);
                }
                

                
            })

        } else {
            return Promise.resolve();
        }
 
        },
  

      };
       if(API.currentEntity == 'Placement')
       {
        return myClient.init();
       }
      
  
    },
  };
  
  export default interaction;
  