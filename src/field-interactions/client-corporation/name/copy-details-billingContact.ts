const interaction: FieldInteraction = {
    fieldName: 'billingContact',
    name: 'copy-details',
    event: 'change',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        change: () => {
          const billingContact = API.getValue('billingContact');

          if(billingContact!==undefined) {
              API.appBridge.httpGET('/entity/ClientContact/${billingContact.id}?fields=address1,address2,city,state,zip,country,email,phone').then( response => {
                API.setValue('customTextBlock3 ',response.data.data.email);
                API.setValue('billingPhone ',response.data.data.phone);
                API.setValue('address1',response.data.data.address1);
                API.setValue('address2',response.data.data.address2);
                API.setValue('city',response.data.data.city);
                API.setValue('state',response.data.data.state);
                API.setValue('zip',response.data.data.zip);
                API.setValue('country',response.data.data.country);
              })

          } else {
              API.setValue('customTextBlock3 ','');
              API.setValue('billingPhone ','');
              API.setValue('address1','');
              API.setValue('address2','');
              API.setValue('city','');
              API.setValue('state','');
              API.setValue('zip','');
              API.setValue('country','');
          }
          
          
 
        },
  

      };
  
      return myClient.change();
  
    },
  };
  
  export default interaction;
  