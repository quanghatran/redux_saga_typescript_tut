import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChangeHistoryTwoTone, Chat, HistoryRounded, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const loading = useAppSelector(selectDashboardLoading);
  const statistic = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCity);

  // console.log({ loading, statistic, highestStudentList, lowestStudentList, rankingByCityList });

  useEffect(() => {
    // dispatch(dashboardActions.dashboardSaga());
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <div>
      <Box className={classes.root}>
        {/* loading */}
        {loading && <LinearProgress className={classes.loading} />}

        {/* statistic section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<PeopleAlt fontSize="large" color="secondary" />}
              label="Male"
              value={statistic.maleCount}
            ></StatisticItem>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<Chat fontSize="large" color="secondary" />}
              label="Female"
              value={statistic.femaleCount}
            ></StatisticItem>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<ChangeHistoryTwoTone fontSize="large" color="secondary" />}
              label="Mark >= 8"
              value={statistic.hightMarkCount}
            ></StatisticItem>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<HistoryRounded fontSize="large" color="secondary" />}
              label="Mark <= 5"
              value={statistic.lowMarkCount}
            ></StatisticItem>
          </Grid>
        </Grid>

        {/* all student ranking */}
        <Box mt={5}>
          <Typography variant="h4">All Students</Typography>

          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Student with lowest mark">
                  <StudentRankingList studentList={lowestStudentList} />
                </Widget>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Rankings by city */}
        <Box mt={5}>
          <Typography variant="h4">Rankings by city</Typography>

          <Box mt={2}>
            <Grid container spacing={3}>
              {rankingByCityList.map((ranking) => (
                <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                  <Widget title={ranking.cityName}>
                    <StudentRankingList studentList={ranking.rankingList} />
                  </Widget>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
