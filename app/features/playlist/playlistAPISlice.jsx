import{
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { PlayerList } from "../../../components/players/PlayerList";
import { apiSlice } from "../../api/apiSlice";


const PlaylistAdapter = createEntityAdapter({});
const initialPlaylistState = PlaylistAdapter.getInitialState();

export const playlistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getPlayerPlaylist: builder.query({
        query: (playerId) => `/player/playlist/?id=${playerId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        keepUnusedDataFor: 5,
        transformResponse: responseData => {
          // Sort function to sort playlist by position
          const sortByPosition = (a, b) => a.position - b.position;
      
          const loadedPlaylist = responseData
            .map(message => {
              message.id = message._id;
              return message;
            })
            .sort(sortByPosition); // Sort the playlist by position
      
          return PlaylistAdapter.setAll(initialPlaylistState, loadedPlaylist);
        },
        providesTags: (results, error, arg) => {
          if (results?.ids) {
            return [
              { type: 'Playlist', id: 'LIST' },
              ...results.ids.map(id => ({ type: 'Playlist', id: 'LIST' })),
            ];
          } else return [{ type: 'Playlist', id: 'LIST' }];
        },
      }),
        
    }),
});

export const {
    useGetPlayerPlaylistQuery
    
} = playlistApiSlice;

export const selectPlayerPlaylistResult = playlistApiSlice.endpoints.getPlayerPlaylist.select();


const selectPlayerPlaylistData = createSelector(
    selectPlayerPlaylistResult,
    selectPlayerPlaylistResult => selectPlayerPlaylistResult.data
);



export const {
    selectAll: selectAllPlaylist
} = PlaylistAdapter.getSelectors( state =>selectPlayerPlaylistData(state) ?? initialPlaylistState);