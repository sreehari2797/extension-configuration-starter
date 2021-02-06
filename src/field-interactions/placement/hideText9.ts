const interaction: FieldInteraction = {
    fieldName: 'correlatedCustomText9',
    name: 'hide-field',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {
  
        adminUserTypeId: parseInt(  "${admin.user.type.id}"),
        //adminUserTypeId: "104816",
  
        init: () => {
            const userTypeId = API.globals.user.userTypeId;

            if(userTypeId!=myClient.adminUserTypeId)
            {
                API.disable('correlatedCustomText9');
            }
          
        },
  
      };
  
      return myClient.init();
  
    },
  };
  
  export default interaction;
  