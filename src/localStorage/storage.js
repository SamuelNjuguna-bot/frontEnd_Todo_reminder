import {create} from "zustand"


function userStore(set){
  return{


    userInformation : null,


    setUserInfo : (data)=>{
        set({userInformation : data})
    },



  }
}

const Store = create(userStore, {"name" :"userStore"})
export default Store