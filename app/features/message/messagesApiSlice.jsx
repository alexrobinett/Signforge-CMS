import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const messageAdapter = createEntityAdapter({});

const initialSate = messageAdapter.getInitialState();

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => `/messages`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedMessages = responseData.map((message) => {
          message.id = message._id;
          return message;
        });
        return messageAdapter.setAll(initialSate, loadedMessages);
      },
      providesTags: (results, error, arg) => {
        if (results?.ids) {
          return [
            { type: 'message', id: 'LIST' },
            ...results.ids.map((id) => ({ type: 'message', id: 'LIST' })),
          ];
        } else return [{ type: 'message', id: 'LIST' }];
      },
    }),
    addNewMessage: builder.mutation({
      query: (initialMessageData) => ({
        url: '/messages',
        method: 'POST',
        body: initialMessageData,
      }),
      invalidatesTags: [{ type: 'message', id: 'LIST' }],
    }),

    updateMessage: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'message', id: arg.id },
      ],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'message', id: arg.id },
      ],
    }),
    updateMessagePosition: builder.mutation({
      query: ({ messageId, position }) => ({
        url: `/messages/${messageId}`,
        method: 'PATCH',
        body: { id: messageId, position },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'message', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessagePositionMutation,
} = messageApiSlice;

export const selectMessageResult =
  messageApiSlice.endpoints.getMessages.select();

const selectMessageData = createSelector(
  selectMessageResult,
  (messagesResult) => messagesResult.data
);

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageByID,
  selectIds: selectMessageIds,
} = messageAdapter.getSelectors(
  (state) => selectMessageData(state) ?? initialSate
);
