const interaction: FieldInteraction = {
    fieldName: 'customFloat1',
    name: 'win-wash-lost',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {
  
        
  
        init: () => {

          if(API.isEdit) {
            API.hide('customFloat1');   
          }
  
          else {
            myClient.disableField();
            return myClient.setInitialValue();
          }
        },
  
        setInitialValue: () => {
          return API.appBridge.httpGET('/entity/JobOrder/${API.globals.userID}?fields=numOpenings').then(response => {
            if(response.data) {
              API.setValue('customFloat1',response.data.numOpenings);
            }
  
            return Promise.resolve();
          });
        },
  
        disableField: () => {
          
            API.disable('customFloat1')
          
        }
  
      };
  
      return myClient.init();
  
    },
  };
  
  export default interaction;
  