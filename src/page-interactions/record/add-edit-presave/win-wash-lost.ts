const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'win-wash-lost',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {
          
            init: () => {
                const status =  form.value.status;

                API.setValue('customFloat1',API.getValue('numOpenings'));
                
                API.hide('customFloat1');                       
                API.disable('customFloat1');
                API.disable('customInt3');

                

                if(status==='Approved') {
                    return API.appBridge.httpGet('/entity/Placement/${API.currentEntityId}?fields=jobOrder(id,customInt3,numOpenings)').then(response => {
                        
                        API.setValue('customInt3',response.jobOrder.customInt3 + 1),
                        API.setValue('numOpenings',response.jobOrder.numOpenings - 1);

                        return API.appBridge.httpPOST('/entity/JobOrder/${response.data.data.id}', {
                            numOpenings: response.data.data.numOpenings
                        })            

                    })
                } else {
                    return Promise.resolve();
                }
 
                
            },
         
        };

        
        return myClient.init();
        
    },
  };
  
  export default interaction;
  