import{ configureStore} from "@reduxjs/toolkit"
import adminSlice from "./Slice/AdminSlice"
import CoachSlice from "./Slice/CoachSlice"


export default configureStore({
    reducer:{admin:adminSlice,coach:CoachSlice}
})