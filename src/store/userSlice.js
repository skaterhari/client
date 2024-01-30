import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
   usersList:[],
   status:'idle',
   error:null
}

export const fetchUsers=createAsyncThunk('fetchUsers',async()=>{
   
    try {
      console.log(process.env.REACT_APP_SERVER_URI)
      const u='http://localhost:4000/fetchUsers';
      const url1=`${process.env.REACT_APP_SERVER_URI}/fetchUsers`
      const url2=process.env.REACT_APP_SERVER_URI+"/fetchUsers"
      console.log(u)
       console.log(url1)
       console.log(url2)
       
        const response = await axios.get(url2);
        return response.data.user; // Assuming your server returns the user object
      } catch (error) {
        throw error;
      }
})

export const editUser=createAsyncThunk('editUser',async(credentials)=>{
   
  try {
      console.log(credentials.id)
      const url=process.env.REACT_APP_SERVER_URI.concat(`/editUser/${credentials.id}`);
      const response = await axios.put(url,credentials.formData);
      return response.data; // Assuming your server returns the user object
    } catch (error) {
      throw error;
    }
})
export const signUpUser=createAsyncThunk('signUpUser',async(credentials)=>{
  try{
    const url=process.env.REACT_APP_SERVER_URI.concat('/api/signup');
        const res=await axios.post(url,credentials)
        return res.data;
  }
  catch(err){
    throw err;
  }
})
export const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
       
    },
    extraReducers: (builder) => {
        // Handle the lifecycle actions for fetchUsers
        builder
          .addCase(fetchUsers.pending, (state) => {
            console.log(state.status)
            console.log(state.usersList)
            state.status = "loading";
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            console.log(state.status)
            state.status = "succeeded";
            state.usersList = action.payload;
            console.log(action.payload)
            console.log(state.status)
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(signUpUser.pending, (state) => {
            console.log(state.status)
            console.log(state.usersList)
            state.status = "loading";
          })
          .addCase(signUpUser.fulfilled, (state, action) => {
            console.log(state.status)
            state.status = "signed-in";
            state.usersList=[...state.usersList,action.payload]
            
            console.log(action.payload)
            console.log(state.status)
          })
          .addCase(signUpUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(editUser.pending, (state) => {
            console.log(state.status)
            console.log(state.usersList)
            state.status = "loading";
          })
          .addCase(editUser.fulfilled, (state, action) => {
            console.log(state.status)
            state.status = "edited";
           const filtered=state.usersList.filter(user=>user._id!==action.payload._id)
           state.usersList=[...filtered,action.payload]
            console.log(action.payload)
            console.log(state.status)
          })
          .addCase(editUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
});
//export const{increment,decrement}=userSlice.actions;
 export const SelectAllUsers=(state)=>state.users.usersList
export const getStatus=(state)=>state.users.status
export const SelectUserById=(state,id)=>{
 return state.users.usersList.find(user=>user._id===id)
}
export default userSlice.reducer;