import{
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../api/apiSlice"

const imageAdapter = createEntityAdapter({})

const initialSate = imageAdapter.getInitialState()

export const imageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getImages: builder.query({
            query: () => `/images/?id=640bf6e47781518ed5c23575`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformErrorResponse: responseData => {
                const loadedImages = responseData.map( image => {
                    image.id = image._id
                    return image
                })
                return imageAdapter.setAll(initialSate, loadedImages)
            },
            providesTags: (results, error, arg) => {
                if (results?.ids){
                    return [
                        {type: 'Image', id: 'LIST'},
                        ...results.ids.map(id => ({ type: 'Image', id}))
                    ]
                }else return [{ type: 'Image', id: 'LIST'}]
            }
        }),
        addNewImage: builder.mutation({
            query: (initialImageData) => ({
              url: "/images",
              method: "POST",
              body: initialImageData, // Pass formData here
            }),
            invalidatesTags: [{ type: "Images", id: "LIST" }],
        }),

        updateImage: builder.mutation({
            query: initialImageData => ({
                url: '/images',
                method: 'PATCH',
                body:{
                    ...initialImageData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Images', id: 'arg.id' }
            ]
        }),
        deleteImage: builder.mutation({
            query: ({id}) => ({
                url: '/images',
                method: 'DELETE',
                body:{ id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Images', id: 'arg.id' }
            ]
        }),
        
    }),
})

export const {
    useGetImagesQuery,
    useAddNewImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
    
} = imageApiSlice


export const selectImageResult = imageApiSlice.endpoints.getImages.select()

const selectImageData = createSelector(
    selectImageResult,
    imagesResult => imagesResult.data
)

export const {
    selectAll: selectAllImages,
    selectById: selectImageByID,
    selectIds: selectImageIds
} = imageAdapter.getSelectors( state => selectImageData(state) ??
initialSate)