import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
  Paper,
  Box,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserLogged, updateUserLogged } from "../../Serivce/ApiService";
import { styled } from "@mui/material/styles";
import "./css/style.scss";

// Styled components
const StyledContainer = styled(Paper)({
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  marginTop: '24px',
});

const HeaderBox = styled(Box)({
  padding: '16px 24px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0',
});

const Title = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#3f51b5',
});

const ContentBox = styled(Box)({
  padding: '24px',
});

const StyledAlert = styled(Alert)({
  marginBottom: '24px',
  fontSize: '16px', // Increase font size for alert
});

const StyledFormBox = styled(Box)(({ theme }) => ({
  '& .MuiTextField-root': { 
    marginBottom: theme.spacing(3), 
    fontSize: '16px'  // Increase font size for input fields
  }
}));

const BirthLabel = styled(Typography)({
  fontWeight: '500',
  marginBottom: '8px',
  fontSize: '18px', // Increase font size for label
});

const SaveButton = styled(Button)({
  textAlign: 'center',
  fontSize: '16px', // Increase font size for button text
  fontWeight: 'bold',
});

const AccountDetail = () => {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      GetUserAccount(token);
    }
  }, []);

  const GetUserAccount = async (token) => {
    try {
      const result = await getUserLogged(token);
      const { dateofbirth, email, fullname, mobile, id } = result.data;
      const birthDate = new Date(dateofbirth);
      setEmail(email);
      setFullname(fullname);
      setMobile(mobile);
      setBirthDay(birthDate.getDate());
      setBirthMonth(birthDate.getMonth() + 1);
      setBirthYear(birthDate.getFullYear());
    } catch (error) {
      console.error("Failed to load account details:", error);
    }
  };

  const handleSaveChange = async () => {
    try {
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
      const updatedData = {
        email,
        fullname,
        mobile,
        password,
        dateofbirth: birthDate.toISOString(),
      };

      await updateUserLogged(updatedData);
      setAlertMessage('Account details updated successfully!');
      setAlertSeverity('success');
    } catch (error) {
      console.error("Failed to update account details:", error);
      setAlertMessage('Failed to update account details. Please try again.');
      setAlertSeverity('error');
    }
  };

  return (
    <Container>
      <StyledContainer elevation={3}>
        <HeaderBox>
          <Title>Account Detail</Title>
        </HeaderBox>

        <ContentBox>
          {alertMessage && (
            <StyledAlert severity={alertSeverity} onClose={() => setAlertMessage('')}>
              {alertMessage}
            </StyledAlert>
          )}

          <StyledFormBox component="form">
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              InputProps={{ style: { fontSize: '16px' } }} // Font size for input text
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              InputProps={{ style: { fontSize: '16px' } }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { fontSize: '16px' } }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ style: { fontSize: '16px' } }}
            />

            <Grid container spacing={2} mb={3}>
              <Grid item xs={3}>
                <BirthLabel>Birth</BirthLabel>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select 
                    value={birthDay} 
                    onChange={(e) => setBirthDay(e.target.value)}
                    sx={{ fontSize: '16px' }} // Increase font size for dropdown
                  >
                    {[...Array(31)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: '16px' }}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select 
                    value={birthMonth} 
                    onChange={(e) => setBirthMonth(e.target.value)}
                    sx={{ fontSize: '16px' }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: '16px' }}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select 
                    value={birthYear} 
                    onChange={(e) => setBirthYear(e.target.value)}
                    sx={{ fontSize: '16px' }}
                  >
                    {[...Array(121)].map((_, i) => (
                      <MenuItem key={2023 - i} value={2023 - i} sx={{ fontSize: '16px' }}>
                        {2023 - i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box textAlign="center">
              <SaveButton variant="contained" size="large" onClick={handleSaveChange}>
                Save change
              </SaveButton>
            </Box>
          </StyledFormBox>
        </ContentBox>
      </StyledContainer>
    </Container>
  );
};

export default AccountDetail;
