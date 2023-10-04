import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import authservice from '../service/authservice';
import MainHeader from "../components/mainheader/MainHeader";
import Sidepannel from "../components/sidebar/sidepannel";
const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Count',
  },
  series: {
    1: { curveType: 'function' },
  },
};
const LineChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const name = 'RELIANCE';
    authservice.LineChart(name)
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          const formattedData = [
            ['Date', 'High', 'Low'],
            ...responseData.map((item) => [item.lastupdatedate, item.high, item.low]),
          ];
          setData(formattedData);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  if (loading) {
    return (
      <div>
         <MainHeader/>
       <Sidepannel/>
        <div className="page-wrapper">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <MainHeader />
        <Sidepannel />
        <div className="page-wrapper">Error: {error.message}</div>
      </div>
    );
  }
  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <div className="mt-5">
          <h2>Line Chart</h2>
          <Chart
            width={'100%'}
            height={'500px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={LineChartOptions}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
      </div>
    </div>
  );
};
export default LineChart;