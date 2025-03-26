// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cohort = "2411-FTB-ET-WEB-PT";
// Define an API using createApi
export const puppyBowlApi = createApi({
  reducerPath: "puppyBowlApi",
  baseQuery: fetchBaseQuery({
    // The base URL for all requests
    baseUrl: `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}-aw`,
  }),
  tagTypes: ["Players"],
  // Define endpoints for our API service
  endpoints: (builder) => ({
    // Define an endpoint that fetches players
    players: builder.query({
      query: () => "/players",
      providesTags: ["Players"],
    }),
    playerId: builder.query({
      query: (id) => `/players/${id}`,
      providesTags: ["Players"],
    }),
    createPlayer: builder.mutation({
      query: (playerData) => ({
        url: "players",
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["Players"],
    }),
    deletePlayer: builder.mutation({
      query: (playerId) => ({
        url: `players/${playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Players"],
    }),
  }),
});

export const {
  usePlayersQuery,
  usePlayerIdQuery,
  useCreatePlayerMutation,
  useDeletePlayerMutation,
} = puppyBowlApi;
