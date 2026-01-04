import React, { useState, useEffect } from "react";
import "./AssignmentW_02.css";

function AssignmentW_39() {
  const [permission, setPermission] = useState(Notification.permission);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    delay: 5,
  });

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestPermission = () => {
    Notification.requestPermission().then((perm) => setPermission(perm));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, icon: imgURL, iconName: file.name }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const delayMs = parseInt(form.delay, 10) * 1000;

    setTimeout(() => {
      new Notification(form.title, {
        body: form.description,
        icon: form.icon || undefined,
      });
      setForm({ title: "", description: "", icon: "", delay: 5 });
    }, delayMs);
  };

  return (
    <div className="main asgW-02">
      <h2>Notification Demo</h2>

      {permission !== "granted" && (
        <button onClick={requestPermission} className="notification-btn">Enable Notifications</button>
      )}

      {permission === "granted" && (
        <form onSubmit={handleSubmit} className="notification-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <div className="upload">
            <input
              type="file"
              name="icon"
              placeholder="Image/Icon URL"
              accept="image/*"
              onChange={handleUpload}
            />
            {form.iconName}
          </div>

          <input
            type="number"
            name="delay"
            placeholder="Delay in seconds"
            value={form.delay}
            onChange={handleChange}
          />
          <button type="submit">Trigger Notification</button>
        </form>
      )}

      {permission === "denied" && (
        <p className="error">
          Notifications are blocked. Please enable.
        </p>
      )}
    </div>

  );
}

export default AssignmentW_39;
