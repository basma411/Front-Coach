import{ configureStore} from "@reduxjs/toolkit"
import adminSlice from "./Slice/AdminSlice"


export default configureStore({
    reducer:{admin:adminSlice}
})