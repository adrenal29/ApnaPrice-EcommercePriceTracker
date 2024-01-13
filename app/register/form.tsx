"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  const handleToggle = () => {
    setFormValues({ ...formValues, ['isVendor']: !isVendor });
    setIsVendor(!isVendor)
   
  };
  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    isVendor:false
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setFormValues({ name: "", email: "", password: "" });
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data=await res.json();
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      let callbackUrl="/user"
      const resp = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: '/user',
      });

      if (!resp?.error) {
        router.push(callbackUrl);
      }
      // signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      
      <div className="mb-6">
      {isVendor==true?
      (<h2>Vendor Registration</h2>):(<h2>User Registration</h2>)
      }
        <input
          required
          type="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Name"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '10px' }}>Are you a vendor?</label>
        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
          <input type="checkbox" checked={isVendor} onChange={handleToggle} />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: isVendor ? '#2196F3' : '#ccc',
            borderRadius: '34px',
            transition: '.4s',
          }}>
            <span style={{
              position: 'absolute',
              content: '""',
              height: '15px',
              width: '16px',
              left: '1px',
              bottom: '5px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: '.4s',
              transform: isVendor ? 'translateX(26px)' : 'translateX(0)'
            }}></span>
          </span>
        </label>
      </div>
    
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block my-2 px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </button>
    </form>
  );
};
