import { RootState } from './../../app/store';
import { Student } from './../../models/student';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  hightMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistic(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

// action
export const dashboardActions = dashboardSlice.actions;

// selectors
export const selectDashboardLoading = (state: RootState) => state.dashBoard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashBoard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashBoard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashBoard.lowestStudentList;
export const selectRankingByCity = (state: RootState) => state.dashBoard.rankingByCityList;

// reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
