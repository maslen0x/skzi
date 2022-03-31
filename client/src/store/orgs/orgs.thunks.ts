import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './orgs.api'

export const getOrgs = createAsyncThunk(
  'orgs/getOrgs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getOrgs()
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)