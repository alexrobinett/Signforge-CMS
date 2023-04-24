import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const userAdapter = createEntityAdapter({});

const initialSate = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/user/`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialSate, loadedUsers);
      },
      providesTags: (results, error, arg) => {
        if (results?.ids) {
          return [
            { type: 'user', id: 'LIST' },
            ...results.ids.map((id) => ({ type: 'user', id: 'LIST' })),
          ];
        } else return [{ type: 'user', id: 'LIST' }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/user',
        method: 'POST',
        body: initialUserData,
      }),
      invalidatesTags: [{ type: 'user', id: 'LIST' }],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: 'PATCH',
        body: { updateName: `${data.file}` },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'user', id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'user', id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUsers.select();

const selectUserData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserByID,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialSate);
