import{ configureStore} from "@reduxjs/toolkit"
import adminSlice from "./Slice/AdminSlice"
import CoachSlice from "./Slice/CoachSlice"
import DomaineSlice from "./Slice/DomainSlice"
import SlidesSlice from "./Slice/SlidesSlice"


export default configureStore({
    reducer:{admin:adminSlice,coach:CoachSlice,domaine:DomaineSlice,slide:SlidesSlice}
})