import{
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const messageAdapter = createEntityAdapter({});

const initialSate = messageAdapter.getInitialState();

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query({
            query: () => `/message/`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedMessages = responseData.map( message => {
                    message.id = message._id;
                    return message;
                });
                return messageAdapter.setAll(initialSate, loadedMessages);
            },
            providesTags: (results, error, arg) => {
                if (results?.ids){
                    return [
                        {type: 'message', id: 'LIST'},
                        ...results.ids.map(id => ({ type: 'message', id: "LIST"}))
                    ];
                }else return [{ type: 'message', id: 'LIST'}];
            }
        }),
        addNewMessage: builder.mutation({
            query: (initialMessageData) => ({
              url: "/message",
              method: "POST",
              body: initialMessageData,
            }),
            invalidatesTags: [{ type: "message", id: "LIST" }],
        }),

        updateMessage: builder.mutation({
            query: (data) => ({
                url: `/message/${data.id}`,
                method: 'PATCH',
                body:{ updateName: `${data.file}` }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'message', id: arg.id }
            ]
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/message/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'message', id: arg.id }
            ]
        }),
        
    }),
});

export const {
    useGetMessagesQuery,
    useAddNewMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    
} = messageApiSlice;


export const selectMessageResult = messageApiSlice.endpoints.getMessages.select();

const selectMessageData = createSelector(
    selectMessageResult,
    messagesResult => messagesResult.data
);

export const {
    selectAll: selectAllMessages,
    selectById: selectMessageByID,
    selectIds: selectMessageIds
} = messageAdapter.getSelectors( state => selectMessageData(state) ?? initialSate);