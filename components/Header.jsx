import React, { useState, useEffect } from "react";
import _ from "lodash";
import Image from "next/image";
import Cookies from "js-cookie";

const Header = ({ header = {} }) => {
  const [email, setEmail] = useState("");
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    const userSession = Cookies.get("userSession");
    if (userSession) {
      setUserGroup(JSON.parse(userSession).userGroup);
    }
  }, []);
  
  useEffect(() => {
    console.log("UserGroup updated:", userGroup);
  }, [userGroup]); 

  const handleLogin = async () => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      Cookies.set("userSession", JSON.stringify({ email, userGroup: data.userGroup }));
      setUserGroup(data.userGroup);
    } else {
      alert(data.error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("userSession");
    setUserGroup(null);
  };

  return (
    <header className="header">
      <div className="logo"> 
      {header?.logo?.fields?.file?.url ? (   
        <Image src={"https:" + header.logo.fields.file.url} alt="Logo" width={120} height={40} />
      
      ): (
        <p>Logo not available</p>
      )}
      </div>
      <ul className="nav-links">
        {header?.headerLinks?.map((item, index) => (
          <li key={index}>
            <a href={item.fields.link} target="_blank">{item.fields.title}</a>
          </li>
        ))}
      </ul>
      <div className="nav-icons">
        {userGroup ? (
          <>
            <span>Welcome, {userGroup}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
