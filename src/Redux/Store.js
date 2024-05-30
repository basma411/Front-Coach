import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./Slice/AdminSlice";
import CoachSlice from "./Slice/CoachSlice";
import DomaineSlice from "./Slice/DomainSlice";
import SlidesSlice from "./Slice/SlidesSlice";
import PartenaireSlice from "./Slice/PartenaireSlice";
import IconSlice from "./Slice/IconSlice";
import BiblioSlice from "./Slice/BiblioSlice";
import NewsLetterSlice from "./Slice/NewsLetterSlice";
import InterfaceSlice from "./Slice/InterfaceSlice";
import loadingSlice from "./Slice/LodingSlice";
import ArticleSlice from "./Slice/ArticleSlice";
import ContactSlice from "./Slice/ContactSlice";
import EvenementSlice from "./Slice/EvenementSlice";
import VedioSlice from "./Slice/VedioSlice";

export default configureStore({
  reducer: {
    admin: adminSlice,
    coach: CoachSlice,
    domaine: DomaineSlice,
    slide: SlidesSlice,
    partenaire: PartenaireSlice,
    icon:IconSlice,
    biblio:BiblioSlice,
    newsletter:NewsLetterSlice,
    interface:InterfaceSlice,
    loading: loadingSlice,
    article:ArticleSlice,
contact:ContactSlice,
evenement:EvenementSlice,
vedio:VedioSlice
  },
});
