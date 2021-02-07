const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'validate-number-of-submissions',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {

            init: () => {
                
                var userId = form.submissions.userid;

                //var elig = myClient.getEligibility(userId);

                return myClient.getEligibility(userId).then(response => {
                    var elig = response.data.data.candidate.customText1;
                    if(elig === 'Pending' || elig === 'Suspended')
                    {
                        form.valid = false;
                        form.errorMessage = 'Eligibility status requires review.';
                    }

                    else {
                        form.valid= true;
                    }

                    return form;
                });

                

            },

            
            getEligibility: (userId) => {

                var eligibilty = API.appBridge.httpGET('/entity/JobSubmission/${userId}?fields=candidate(customText1)')
                return eligibilty;
            }

        };

        if(API.currentEntity === 'JobSubmission')
        {
            return myClient.init();
        }
    },
  };
  
  export default interaction;
  