import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const match = useRouteMatch();

  const studentList = useAppSelector(selectStudentList);

  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  // const cityList = useAppSelector(selectCityList);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        // onEdit={handleEditStudent}
        // onRemove={handleRemoveStudent}
      />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
