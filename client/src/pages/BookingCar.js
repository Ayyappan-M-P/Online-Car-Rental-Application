/*import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';

import 'aos/dist/aos.css'; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("YYYY-MM-DD HH:mm"));
    setTo(moment(values[1]).format("YYYY-MM-DD HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function onToken(token){
    const reqObj = {
        token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51OeKu9SH2Fp9YMMcAk5ptePAcKSE2RJExEgGFnt0EJsd1tDmZitTEY95MlTpQLtkwlvKyDt7z08uSpBtRTY5BCbx00FhzQhPOu"
              >
                  <button className="btn1">
                Book Now
              </button>
              </StripeCheckout>

              
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;*/


import React, { useState, useEffect } from 'react';
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import { useParams } from 'react-router-dom';
import { bookCar } from '../redux/actions/bookingActions';
import moment from "moment";
import Spinner from "../components/Spinner";
import DefaultLayout from '../components/DefaultLayout';

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [showModal, setShowModal] = useState(false);
  const [car, setCar] = useState({});
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    if (cars.length > 0) {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("YYYY-MM-DD HH:mm"));
    setTo(moment(values[1]).format("YYYY-MM-DD HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function handleBookCar() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1" />
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div className="text-right">
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /--</p>
            <p>Fuel : {car.fuelType}</p>
            <p>capacity : {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>

          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  setdriver(e.target.checked);
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              
                <button className="btn1" onClick={handleBookCar}>
                  Book Now
                </button>
              
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => {
                return (
                  <button className="btn1 mt-2" key={index}>
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}
export default BookingCar;





/*import React, { useState, useEffect } from 'react';
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import { useParams } from 'react-router-dom';
import { bookCar } from '../redux/actions/bookingActions';
import moment from "moment";
import Spinner from "../components/Spinner";
import DefaultLayout from '../components/DefaultLayout';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [car, setCar] = useState({});
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    if (cars.length > 0) {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("YYYY-MM-DD HH:mm"));
    setTo(moment(values[1]).format("YYYY-MM-DD HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function handleBookCar() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    };
    dispatch(bookCar(reqObj));
  }

  // Map related states
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [currentLocationAddress, setCurrentLocationAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const { isLoaded } = useJsApiLoader({
    id: 'livelocationcar',
    googleMapsApiKey: "AIzaSyCJ6wQdlveDqp90EPLIJUJ76YsmgEqKb6g"
  });


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        getCurrentLocationAddress(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Function to get the address of current location
  const getCurrentLocationAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setCurrentLocationAddress(results[0].formatted_address);
        } else {
          setCurrentLocationAddress('Address not found');
        }
      } else {
        setCurrentLocationAddress('Geocoder failed due to: ' + status);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  // Function to handle destination selection
  const handleDestinationSelect = (e) => {
    setDestination({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    getDestinationAddress(e.latLng.lat(), e.latLng.lng());
  };

  // Function to get the address of destination
  const getDestinationAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setDestinationAddress(results[0].formatted_address);
        } else {
          setDestinationAddress('Address not found');
        }
      } else {
        setDestinationAddress('Geocoder failed due to: ' + status);
      }
    });
  };

  if (!isLoaded) return <Spinner />;
  
  // Map options
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: currentLocation ? currentLocation.lat : 0,
    lng: currentLocation ? currentLocation.lng : 0,
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "80vh" }}>
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1" alt="Car" />
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>Car Info</Divider>
          <div className="text-right">
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /--</p>
            <p>Fuel : {car.fuelType}</p>
            <p>capacity : {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>Select Time Slots</Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button className="btn1 mt-2" onClick={() => setShowModal(true)}>See Booked Slots</button>

          {from && to && (
            <div>
              <p>Total Hours : <b>{totalHours}</b></p>
              <p>Rent Per Hour : <b>{car.rentPerHour}</b></p>
              <Checkbox onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
              <h3>Total Amount : {totalAmount}</h3>
              <button className="btn1" onClick={handleBookCar}>Book Now</button>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => (
                <button className="btn1 mt-2" key={index}>
                  {slot.from} - {slot.to}
                </button>
              ))}
              <div className="text-right mt-5">
                <button className="btn1" onClick={() => setShowModal(false)}>CLOSE</button>
              </div>
            </div>
          </Modal>
        )}

        <Col lg={24}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={handleDestinationSelect}
          >
           
            {currentLocation && <Marker position={currentLocation} />}
            
            {destination && <Marker position={destination} />}
          </GoogleMap>
        </Col>
      </Row>

      
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col span={12}>
          <p>Current Location: {currentLocationAddress}</p>
          <p>Destination: {destinationAddress}</p>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar; */