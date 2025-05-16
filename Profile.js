import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Container, Form, Button, Card } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    profilePicture: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user data
    axios.get("http://localhost:5000/profile/1")
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpdateProfile = () => {
    axios.put("http://localhost:5000/profile/update", user)
      .then(() => alert("Profile updated successfully!"))
      .catch(err => console.error(err));
  };

  const handleChangePassword = () => {
    axios.put("http://localhost:5000/profile/change-password", {
      userId: "1",
      oldPassword,
      newPassword
    })
    .then(() => alert("Password changed successfully!"))
    .catch(err => console.error(err));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPicture = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    formData.append("userId", "1");

    axios.post("http://localhost:5000/profile/upload-picture", formData)
      .then(res => {
        alert("Profile picture updated!");
        setUser(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {/* Navbar with profile picture */}
      <Navbar bg="light" className="mb-4 p-3">
        <Container>
          <Navbar.Brand href="#home">DencyGlam Beauty</Navbar.Brand>
          {user.profilePicture && (
            <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt="Profile" className="rounded-circle" width="50" height="50" />
          )}
        </Container>
      </Navbar>

      <Container>
        <Card className="p-4">
          <h3>My Profile</h3>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </Form.Group>

            <Button className="mt-3" onClick={handleUpdateProfile}>Update Profile</Button>
          </Form>
        </Card>

        {/* Change Password */}
        <Card className="p-4 mt-3">
          <h3>Change Password</h3>
          <Form>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Button className="mt-3" onClick={handleChangePassword}>Change Password</Button>
          </Form>
        </Card>

        {/* Upload Profile Picture */}
        <Card className="p-4 mt-3">
          <h3>Upload Profile Picture</h3>
          <Form>
            <Form.Group>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button className="mt-3" onClick={handleUploadPicture}>Upload Picture</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
