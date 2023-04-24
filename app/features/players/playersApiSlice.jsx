import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { PlayerList } from '../../../components/players/PlayerList';
import { apiSlice } from '../../api/apiSlice';

const playerAdapter = createEntityAdapter({});
const initialSate = playerAdapter.getInitialState();

export const playerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => `/player/`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedPlayers = responseData.map((player) => {
          player.id = player._id;
          return player;
        });
        return playerAdapter.setAll(initialSate, loadedPlayers);
      },
      providesTags: (results, error, arg) => {
        if (results?.ids) {
          return [
            { type: 'player', id: 'LIST' },
            ...results.ids.map((id) => ({ type: 'player', id: 'LIST' })),
          ];
        } else return [{ type: 'player', id: 'LIST' }];
      },
    }),
    addNewPlayer: builder.mutation({
      query: (initialPlayerData) => ({
        url: '/player',
        method: 'POST',
        body: initialPlayerData,
      }),
      invalidatesTags: [{ type: 'player', id: 'LIST' }],
    }),

    updatePlayer: builder.mutation({
      query: (data) => ({
        url: `/player/${data.id}`,
        method: 'PATCH',
        body: JSON.stringify({ playerName: data.playerName, id: data.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'player', id: arg.id }],
    }),

    deletePlayer: builder.mutation({
      query: (data) => ({
        url: `/player/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'player', id: arg.id }],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useAddNewPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = playerApiSlice;

export const selectPlayerResult = playerApiSlice.endpoints.getPlayers.select();

const selectPlayerData = createSelector(
  selectPlayerResult,
  (playersResult) => playersResult.data
);

export const {
  selectAll: selectAllPlayers,
  selectById: selectPlayerByID,
  selectIds: selectPlayerIds,
} = playerAdapter.getSelectors(
  (state) => selectPlayerData(state) ?? initialSate
);
