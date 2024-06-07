import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
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
import TemoignegeSlice from "./Slice/TemoignegeSlice";

// Combine all slices into a root reducer
const rootReducer = combineReducers({
  admin: adminSlice,
  coach: CoachSlice,
  domaine: DomaineSlice,
  slide: SlidesSlice,
  partenaire: PartenaireSlice,
  icon: IconSlice,
  biblio: BiblioSlice,
  newsletter: NewsLetterSlice,
  interface: InterfaceSlice,
  loading: loadingSlice,
  article: ArticleSlice,
  contact: ContactSlice,
  evenement: EvenementSlice,
  vedio: VedioSlice,
  temoignage: TemoignegeSlice,
});

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
