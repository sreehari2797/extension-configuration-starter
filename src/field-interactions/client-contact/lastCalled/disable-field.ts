const interaction: FieldInteraction = {
    fieldName: 'customDate1',
    name: 'disable-field',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {
  
        //adminUserTypeId: parseInt(  "${admin.user.type.id}"),
        adminUserTypeId: "104816",
  
        init: () => {
            const userTypeId = API.globals.user.userTypeId;

            if(userTypeId!==myClient.adminUserTypeId)
            {
                API.disable('customDate1');
            }
          
        },
  
      };
  
      return myClient.init();
  
    },
  };
  
  export default interaction;
  