const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'validate-number-of-submissions',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {

          
            init: () => {
                const jobOrderId = form.jobOrder.id;

                //var max = myClient.getMaxSubmissions(jobOrderId);
                //var num = myClient.queryNumberOfSubmissions(jobOrderId);

                return myClient.getMaxSubmissions(jobOrderId).then(response => {
                    const max = response.data.data.customText9;
                    
                    return myClient.queryNumberOfSubmissions(jobOrderId).then(response => {
                      const num = response.data.total; 
                      
                      if(num < max)
                      {
                          form.valid =  true;
                      }
      
                      else {
                          form.valid = false;
                          form.errorMessage = 'We have reached the maximum number of submissions that the Facility allows.';
                      }
                        
                        return form;
                    });
                })

                
                
            },

            
            getMaxSubmissions: (jobOrderId) => {
                var maxSub = API.appBridge.httpGET('/entity/JobOrder/${jobOrderId}?fields=clientCorporation(customText9)')
                return maxSub;
            },

            queryNumberOfSubmissions: (jobOrderId) => {
                const where = 'jobOrder.id = ${jobOrderId}';

                var numSub = API.appBridge.httpGET('/query/JobSubmission?where=${where}&fields=id&showTotalMatched=true')

                return numSub;
            }
        };

        if(API.currentEntity === 'JobSubmission')
        {
            return myClient.init();
        }
    },
  };
  
  export default interaction;
  