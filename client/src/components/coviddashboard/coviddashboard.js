import React, { Component, useState, useEffect  } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import "./coviddashboard.css";
import axios from 'axios';



export default function Coviddashboard() {
  
  const [covidData, setcovidData] = useState({
    confirmed: "",
    recovered: "",
    hospitalized: "",
    deaths: "",
    newconfirmed: "",
    newrecovered: "" ,
    newdeaths: "" ,
    newhospitalized: ""
    
  })
  
  const [datadonut, setdatadonut] = useState({
    labels: ["1", "2", "3", "4"],
    datasets: [
      {
        data: [300, 100 ,300 ,200 ,400],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" , "#1DB351","#E140EA"]
      },
    ],
  });
  
  const [covidDataTop5, setcovidDataTop5] = useState({
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: [300, 100 ,300 ,200 ,400],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" , "#1DB351","#E140EA"]
      },
    ],
  });

  const [covidGender, setcovidGender] = useState({
    labels: ["Boy", "Girl", "Others"],
    datasets: [
      {
        data: [],
        backgroundColor: []
      },
    ],
  });

  useEffect(async () => {
    const result = await axios.get('https://covid19.th-stat.com/api/open/today');
    //console.log(result)
    setcovidData({ 
      confirmed: result.data.Confirmed,
      recovered: result.data.Recovered,
      hospitalized: result.data.Hospitalized,
      deaths: result.data.Deaths,
      newconfirmed: result.data.NewConfirmed,
      newrecovered: result.data.NewRecovered ,
      newdeaths: result.data.NewDeaths ,
      newhospitalized: result.data.NewHospitalized
    });
    setdatadonut({ 
      labels: ['Confirmed','Recovered','Hospitalized','Deaths'],
      datasets: [
        {
          data: [result.data.Confirmed, result.data.Recovered ,result.data.Hospitalized ,result.data.Deaths ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" , "#1DB351"]
        },
      ]
    });
  }, []);

  useEffect(async () => {
    const result = await axios.get('https://covid19.th-stat.com/api/open/cases/sum');
    const Province = result.data.Province;
    const ArrProvince = Object.keys(Province);
    const ValueProvince = Object.values(Province);


    setcovidDataTop5({ 
      labels: [ArrProvince[0],ArrProvince[1],ArrProvince[2],ArrProvince[3],ArrProvince[4]],
      datasets: [
        {
          data: [ValueProvince[0],ValueProvince[1],ValueProvince[2],ValueProvince[3],ValueProvince[4]],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" , "#1DB351","#E140EA"]
        },
      ]
    });
    setcovidGender({ 
      labels: ["Male", "Female", "Unknown"],
      datasets: [
        {
          data: [result.data.Gender.Male, result.data.Gender.Female ,result.data.Gender.Unknown ],
          backgroundColor: ["#1662BA", "#F02660", "#FFCE56"]
        },
      ]
    });
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <h1>
          Covid-19
          <small>Dashboard</small>
        </h1>
      </section>

      <section className="content">
        <div className="box">
          <div className="box-body">
            <p>
              <b>Thailand</b> Dashboard
            </p>
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-aqua">
                    <i className="ion ion-ios-virus" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">ติดเชื้อสะสม</span>
                    <span className="info-box-number">{covidData.confirmed} (+{covidData.newconfirmed})</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-green">
                    <i className="ion-ios-drug" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">รักษาหายเเล้ว</span>
                    <span className="info-box-number">{covidData.recovered} (+{covidData.newrecovered})</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              {/* fix for small devices only */}
              <div className="clearfix visible-sm-block" />
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-red">
                    <i className="ion ion-ios-bone" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">เสียชีวิต</span>
                    <span className="info-box-number">{covidData.deaths} (+{covidData.newdeaths})</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-yellow">
                    <i className="ion ion-ios-hospital" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">รักษาอยู่ที่โรงพยาบาล</span>
                    <span className="info-box-number">{covidData.hospitalized}  (+{covidData.newhospitalized}) </span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
            </div>

            <div className="row">
              <div className="col-md-4">
                <div
                  className="bg-gray disabled color-palette"
                  style={{ borderRadius: 10, margin: 4 }}
                >
                  <div className="box-header">
                    <h3 className="box-title text-danger"><b>ผู้ป่วย ชาย/หญิง</b></h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fa fa-refresh" />
                      </button>
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body text-center">
                    <Doughnut data={covidGender} width={300} />
                  </div>
                  {/* /.box-body */}
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
              <div className="col-md-4">
                <div
                  className="bg-gray disabled color-palette"
                  style={{ borderRadius: 10, margin: 4 }}
                >
                  <div className="box-header">
                    <h3 className="box-title text-blue">
                      <b>Top 5 จังหวัดติดเชื้อ</b>
                    </h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fa fa-refresh" />
                      </button>
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body text-center">
                    <Bar
                      data={covidDataTop5}
                      yAxisID = {0}
                      width={10}
                      height={188.5}
                      options={{ maintainAspectRatio: false }}
                    />
                  </div>
                  {/* /.box-body */}
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
              <div className="col-md-4">
                <div
                  className="bg-gray disabled color-palette"
                  style={{ borderRadius: 10, margin: 4 }}
                >
                  <div className="box-header">
                    <h3 className="box-title text-warning">
                      <b>อัตราส่วนของผู้ป่วย</b>
                    </h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fa fa-refresh" />
                      </button>
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body text-center">
                    <Doughnut data={datadonut} width={300} />
                  </div>
                  {/* /.box-body */}
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
