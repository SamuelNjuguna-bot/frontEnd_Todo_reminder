import Store from "../localStorage/storage"
function Zustand() {
    const store = Store((state)=>{
       return state.setUserInfo
    })

    store({name: "John", age : 25, dateOfBirth :"22/07/2000"})

}



export default Zustand
