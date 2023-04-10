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
            query: () => `/images/`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedImages = responseData.map( image => {
                    image.id = image._id
                    return image
                })
                return imageAdapter.setAll(initialSate, loadedImages)
            },
            providesTags: (results, error, arg) => {
                if (results?.ids){
                    return [
                        {type: 'Image', id: 'Image'},
                        ...results.ids.map(id => ({ type: 'Image', id: "Image"}))
                    ]
                }else return [{ type: 'Image', id: 'Image'}]
            }
        }),
        addNewImage: builder.mutation({
            query: (initialImageData) => ({
              url: "/images",
              method: "POST",
              body: initialImageData,
            }),
            invalidatesTags: [{ type: "Image", id: "Image" }],
        }),

        updateImage: builder.mutation({
            query: (data) => ( console.log(data),{
                url: `/images/${data.id}`,
                method: 'PATCH',
                body:{ updateName: `${data.file}` },
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Image', id: arg.id }
            ]
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `/images/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Image', id: arg.id }
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
} = imageAdapter.getSelectors( state => selectImageData(state) ?? initialSate)