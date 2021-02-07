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
              API.appBridge.httpGET('/entity/ClientContact/${billingContact.id}?fields=address,email,phone').then( response => {
                API.setValue('customTextBlock3 ',response.data.data.email);
                API.setValue('billingPhone ',response.data.data.phone);
                API.setValue('address1',response.data.data.address.address1);
                API.setValue('address2',response.data.data.address.address2);
                API.setValue('city',response.data.data.address.city);
                API.setValue('state',response.data.data.address.state);
                API.setValue('zip',response.data.data.address.zip);
                API.setValue('country',response.data.data.address.country);
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
  