import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase.js";

export const Tables = (props) => {
    const [vacName, setVacName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [vacData, setVacData] = useState([]);
    const [vacName2, setVacName2] = useState('');
    const [expDate2, setExpDate2] = useState('');
    const [vacData2, setVacData2] = useState([]);
    const [vacName3, setVacName3] = useState('');
    const [expDate3, setExpDate3] = useState('');
    const [vacData3, setVacData3] = useState([]);

    const [email, setEmail] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        if (props.user && props.user.uid) {
          const emailCheck = await getDoc(doc(db, "users", props.user.uid));

              if (emailCheck.exists()) {
                setEmail(emailCheck.data());
              } else {
                console.log("email don't exist");
              }
        } else {
          console.log("props.user or props.user.uid don't exist");
        }
      };
      fetchData();
    }, [props.user]);


    useEffect(() => {
      const fetchData = async () => {
          // Check if props.user and props.user.uid are defined
          if (props.user && props.user.uid) {
              const docRef = doc(db, "users", props.user.uid, "tables", "tableData");
              const docSnap = await getDoc(docRef);
  
              if (docSnap.exists()) {
                  setVacData(Array.isArray(docSnap.data().tables.pastDue) ? docSnap.data().tables.pastDue : []);
                  setVacData2(Array.isArray(docSnap.data().tables.upcoming) ? docSnap.data().tables.upcoming : []);
                  setVacData3(Array.isArray(docSnap.data().tables.current) ? docSnap.data().tables.current : []);
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                  setVacData([]);
                  setVacData2([]);
                  setVacData3([]);
              }
          } else {
              console.log('props.user or props.user.uid is undefined', props.user);
          }
      };
  
      fetchData();
  }, [props.user]); // Depend on props.user instead of props.user.uid

    const today = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVac = { vacName, expDate };

        let newVacData = vacData;
        let newVacData2 = vacData2;
        let newVacData3 = vacData3;
        
        if (new Date(expDate) < today) {
            // Expiration date is before today, add to the first table
            newVacData = [...vacData, newVac];
            setVacData(newVacData);
        } else if (new Date(expDate) <= new Date(today).setDate(today.getDate() + 30)) {
            // Expiration date is between today and 1 month from today, add to the second table
            newVacData2 = ([...vacData2, newVac]);
            setVacData2(newVacData2);
        } else {
            // Expiration date is more than 1 month from today, add to the third table
            newVacData3 = ([...vacData3, newVac]);
            setVacData3(newVacData3);
        }
        // Check if props.user and props.user.uid are defined
        if (props.user && props.user.uid) {
          await setDoc(doc(db, "users", props.user.uid, "tables", "tableData"), {
            tables: {
                pastDue: newVacData,
                upcoming: newVacData2,
                current: newVacData3
            }
          });
        } else {
          console.log('props.user or props.user.uid is undefined', props.user);
        }

        setVacName('');
        setExpDate('');

    }

    

    return (
        <div className="auth-form-container">
          
          <h1 style={{ textAlign: 'center', color: 'white' }}>Welcome, {email.email}</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ marginRight: '20px' }}>
                <label htmlFor="vacName" style={{ paddingRight: '10px' }}>Name of Vaccination</label>
                <input
                  value={vacName}
                  onChange={(e) => setVacName(e.target.value)}
                  type="text"
                  placeholder="Name of Vaccination"
                  id="vacName"
                  name="vacName"
                />
              </div>
              <div>
                <label htmlFor="expDate" style={{ paddingRight: '10px' }}>Expiration Date</label>
                <input
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  type="date"
                  name="expDate"
                  id="expDate"
                />
              </div>
            </div>
            <button type="submit">Add</button>
          </form>
      
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'red', padding: '10px', textAlign: 'center' }}>
                      [URGENT] Past Due Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'black', padding: '10px', textAlign: 'center' }}>
                      Upcoming Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData2.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
      
            <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'black', padding: '10px', textAlign: 'center' }}>
                      Current Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData3.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          </div>
          <div>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go to Login</button>
    </div>
        </div>
        
      );
      
}

export default Tables;