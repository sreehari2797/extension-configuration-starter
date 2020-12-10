const interaction: FieldInteraction = {
    fieldName: 'customText19',
    name: 'copy-details',
    event: 'change',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        change: () => {
          const customText19 = API.getValue('customText19');

          if(customText19!==undefined) {
              API.appBridge.httpGet('/entity/ClientContact/${customText19.id}?fields=email,phone').then( response => {
                API.setValue('customText18 ',response.data.data.email);
                API.setValue('customText20 ',response.data.data.phone);
                
              })

          } else {
              API.setValue('customText18 ','');
              API.setValue('customText20','');
              

          }
          
          
 
        },
  

      };
  
      return myClient.change();
  
    },
  };
  
  export default interaction;
  