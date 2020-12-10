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
              API.appBridge.httpGet('/entity/ClientContact/${billingContact.id}?fields=address,email,phone').then( response => {
                API.setValue('customTextBlock3 ',response.data.data.email);
                API.setValue('billingPhone ',response.data.data.phone);
                API.setValue('billingAddress',response.data.data.address);
              })

          } else {
              API.setValue('customTextBlock3 ','');
              API.setValue('billingPhone ','');
              API.setValue('billingAddress','');

          }
          
          
 
        },
  

      };
  
      return myClient.change();
  
    },
  };
  
  export default interaction;
  