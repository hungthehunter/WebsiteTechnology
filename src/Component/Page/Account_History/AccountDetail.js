import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/style.scss";

const AccountDetail = () => {
  /*------- Page function -------*/

  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState();
  const [password, setPassword] = useState("");
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleDayChange = (event) => setBirthDay(event.target.value);
  const handleMonthChange = (event) => setBirthMonth(event.target.value);
  const handleYearChange = (event) => setBirthYear(event.target.value);
  const handleFullNameChange = (event) => setFullname(event.target.value);
  const handlePhoneChange = (event) => setMobile(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return days;
  };

  const renderMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return months;
  };

  const renderYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      years.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return years;
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    if (token) {
      GetUserAccount(token);
    }
  }, []);

  const GetUserAccount = async (token) => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { dateofbirth } = result.data;
      const birthDate = new Date(dateofbirth);
      setEmail(result.data.email);
      setFullname(result.data.fullname);
      setMobile(result.data.mobile);
      setBirthDay(birthDate.getDate());
      setBirthMonth(birthDate.getMonth() + 1);
      setBirthYear(birthDate.getFullYear());
      setId(result.data.id);
    } catch (error) {
      console.error("Failed to load account details:", error);
    }
  };

  const handleSaveChange = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

      const updatedData = {
        email,
        fullname,
        mobile,
        password,
        dateofbirth: birthDate.toISOString(),
      };

      await axios.put(`http://localhost:8080/api/v1/admin/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set success alert
      setAlertMessage('Account details updated successfully!');
      setAlertSeverity('success');
    } catch (error) {
      console.error("Failed to update account details:", error);

      // Set error alert
      setAlertMessage('Failed to update account details. Please try again.');
      setAlertSeverity('error');
    }
  };

  return (
    <div>
      {/* ================ Account Detail ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Account Detail</h2>
          </div>

          {/* Conditionally render Alert */}
          {alertMessage && (
            <Alert severity={alertSeverity} onClose={() => setAlertMessage('')}>
              {alertMessage}
            </Alert>
          )}

          <form className="form-account">
            <div className="form__line-wrap">
              <label className="form-label" htmlFor="Full Name">
                Full Name
              </label>
              <input
                className="form-input"
                placeholder="Full Name"
                name="Full Name"
                value={fullname}
                onChange={handleFullNameChange}
              />
            </div>

            <div className="form__line-wrap">
              <label className="form-label" htmlFor="Phone Number">
                Phone Number
              </label>
              <input
                className="form-input"
                placeholder="Phone Number"
                name="Phone Number"
                value={mobile}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="form__line-wrap">
              <label className="form-label" htmlFor="Email">
                Email
              </label>
              <input
                className="form-input"
                placeholder="Email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form__line-wrap">
              <label className="form-label" htmlFor="Password">
                Password
              </label>
              <input
                className="form-input"
                placeholder="Password"
                name="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form__line-wrap">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <label className="form-label">Birth</label>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Day</InputLabel>
                    <Select value={birthDay} onChange={handleDayChange}>
                      {renderDays()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Month</InputLabel>
                    <Select value={birthMonth} onChange={handleMonthChange}>
                      {renderMonths()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Year</InputLabel>
                    <Select value={birthYear} onChange={handleYearChange}>
                      {renderYears()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <label></label>
            <div className="form__input-wrapper">
              <Button
                variant="contained"
                size="large"
                className="button"
                onClick={handleSaveChange}
              >
                Save change
              </Button>
            </div>
          </form>
        </div>
        {/* ================= New Customers ================ */}
      </div>
    </div>
  );
};

export default AccountDetail;
