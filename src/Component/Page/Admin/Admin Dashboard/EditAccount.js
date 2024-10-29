import { useEffect, useState } from "react";
import "./assets/css/style.scss";
function AdminEditCustomer({ id, setActiveComponent, showAlert }) {
  /*------- Page function -------*/
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // EditCustomer: Combobox handle change
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  /*------- Database function -------*/

  // EditCustomer: Data User form

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("true");

  // GET: Get Data User form to Database Users by id and load it

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await getUserLoggedById(id);
        // Assume the response data structure is { name, phoneNumber, email, password }
        const { name, phoneNumber, address, email, password } = response.data;
        setName(name);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setPassword(password);
        setAddress(address);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchCustomerData();
  }, [id]); // Dependency array includes id to re-run when id changes

  // Put: Change data User by id  to Database Users

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("status", status);
    try {
      const response = await updateUserLogged(id,formData);
      // Clear form fields
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setAddress("");
      showAlert("Edit customer successfully.", "success");
      setTimeout(()=>setActiveComponent({ name: "AdminCustomer" }),1000);
      console.log(response)
    } catch (error) {
      console.error("Error editing user:", error);
      showAlert("Failed to edit customer.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Information for New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="true">Hoạt động</MenuItem>
            <MenuItem value="false">Đã xóa</MenuItem>
          </Select>
          <FormHelperText>Choose the status of the user</FormHelperText>
        </FormControl>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={() => setActiveComponent({ name: "AdminCustomer" })}
          >
            Return Customer
          </Button>
        </Box>
      </form>
    </Box>
  );
}
export default AdminEditCustomer;
