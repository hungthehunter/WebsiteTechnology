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
    <div>
      {/* ================ Form add user ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Information for new User</h2>
          </div>
          <form onSubmit={handleSubmit} style={{ paddingTop: 15 }}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Mobile" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter phoneNumber phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phoneNumber phone"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="adress" className="form-label">
                address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter password"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                status
              </label>
              <select id="status" value={status} onChange={handleChange}>
                <option value="true">Hoạt động</option>
                <option value="false">Đã xóa</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="status viewing mx-2">
              Confirm
            </button>

            <button
              type="button"
              className="status deleting mx-2"
              onClick={() => setActiveComponent({ name: "AdminCustomer" })}
            >
              Return Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminEditCustomer;
