import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../../../../services/redux/thunks/thunk";
import "../assets/css/style.scss";
function AdminViewCustomer({ id, setActiveComponent }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addresses, setAddresses] = useState([]);
  // const listAddress = useSelector((state) => 
  //   state.address.listAddress.filter(address => address.user.id === id)
  // );
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const listAddress = (selectedUser?.addresses || []).filter(address => address.status === true);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(userThunk.getUserById(id));
    }
  }, [dispatch, id]);


  
  // Update local state when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setFullname(selectedUser?.fullname || "");
      setMobile(selectedUser?.mobile || "");
      setEmail(selectedUser?.email || "");
      setDateOfBirth(
        selectedUser?.dateofbirth
         
      )
      setAddresses(listAddress || []);
        //  setAddresses(selectedUser?.addresses || [])
    }
  }, [selectedUser]);

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 9999
      }}>
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4 }}>
        <CardHeader
          title="Customer Information"
          sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
        />
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 100, height: 100, borderRadius: 0 }}>
                  <PersonIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {fullname || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Customer ID: {id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <PhoneIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Mobile"
                    secondary={mobile || "N/A"}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <EmailIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Email"
                    secondary={email || "N/A"}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <CakeIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Date of Birth"
                    secondary={dateOfBirth || "N/A"}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <LocationOnIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Addresses"
                    secondary={
                      addresses.length > 0 ? (
                        <Box>
                          {addresses.map((address, index) => (
                            <Typography
                              key={index}
                              variant="body1"
                              sx={{ mb: 1 }}
                            >
                              {`${address.houseNumber}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        "No addresses available"
                      )
                    }
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminCustomer" })}
            >
              Return to Customer List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminViewCustomer;
